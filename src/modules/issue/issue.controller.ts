import type { Request, Response } from "express";
import { issueService } from "./issue.service";
import sendResponse from "../../utility/sendResponse";
// Post method
const createIssue = async (req: Request, res: Response) => {
    const user_id: string = req?.user?.id;
    try {
        const result = await issueService.issueCreateIntoDB(req.body, user_id as string);
        sendResponse(res, { statusCode: 201, success: true, message: "Issue created successfully", data: result.rows[0] })
    } catch (error) {
        sendResponse(res, { statusCode: 500, success: false, message: "Issue creation failed due to a server error.", error: error })
    }
}
const getAllIssue = async (req: Request, res: Response) => {
    try {
        const result = await issueService.getAllIssueFromDB();
        sendResponse(res, { statusCode: 200, success: true, data: result })
    } catch (error) {
        sendResponse(res, { statusCode: 201, success: false, message: "Failed to get issues data due to a server error.", error: error })
    }
}
// get single user by id
const getSingleIssue = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const result = await issueService.getSingleIssueFromDB(id as string);
        console.log(result, 'dddd')
        if (!result) {
            sendResponse(res, { statusCode: 404, success: false, message: "Resource not found maybe data not exists", data: null })
        }
        sendResponse(res, { statusCode: 200, success: true, data: result })
    } catch (error) {
        sendResponse(res, { statusCode: 201, success: false, message: "Failed to get data due to a server error.", error: error })
    }
}
const updateUser = async (req: Request, res: Response) => {
    try {
        const result = await issueService.updateUserIntoDB()
    } catch (error) {

    }
}
const deleteUser = async (req: Request, res: Response) => {

    const id = req.params.id;
    try {
        const result = await issueService.deleteUserIntoDB(id as string);
        if (result.rows.length === 0) {
            sendResponse(res, { statusCode: 404, success: false, message: "Resource not founded" })
        }
        sendResponse(res, { statusCode: 200, success: true, message: "Issue deleted successfully" })
    } catch (error) {
        sendResponse(res, { statusCode: 500, success: false, message: "Failed to delete data due to a server error.", error: error })
    }
}
export const issueController = {
    createIssue,
    getAllIssue,
    getSingleIssue,
    updateUser,
    deleteUser
}