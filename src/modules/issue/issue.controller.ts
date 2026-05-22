import type { Request, Response } from "express";
import { issueService } from "./issue.service";

const createIssue = async (req: Request, res: Response) => {
    const user_id:string = req?.user?.id;
    try {
        const result = await issueService.issueCreateIntoDB(req.body, user_id as string);
        res.status(201).json({
            "success": true,
            "message": "Issue created successfully",
            data: result.rows[0]
        })
    } catch (error) {

    }
}
const getAllIssue = async (req: Request, res: Response) => {
    try {
        const result = await issueService.getAllIssueFromDB();
        res.send(result.rows)
    } catch (error) {
        console.error(error)
    }
}
// get single user by id
const getSingleIssue = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const result = await issueService.getSingleIssueFromDB(id as string);
        if (result.rows.length === 0) {
            // invalid id or not found
        }
        res.send(result.rows)
    } catch (error) {
        console.error(error)
    }
}
const updateUser = async (req: Request, res: Response) => {
    try {
        const result = await issueService.updateUserIntoDB()
    } catch (error) {

    }
}
const deleteUser = async (req: Request, res: Response) => {
    try {
        const result = await issueService.deleteUserIntoDB();

    } catch (error) {

    }
}
export const issueController = {
    createIssue,
    getAllIssue,
    getSingleIssue,
    updateUser,
    deleteUser
}