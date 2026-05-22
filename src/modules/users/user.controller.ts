import type { Request, Response } from "express"
import { userService } from "./user.service"
import sendResponse from "../../utility/sendResponse"

// create user func
const createUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.createUserIntoDB(req.body)
        // res.status(201).json({
        //     "success": true,
        //     "message": "User registered successfully",
        //     data: result.rows[0]
        // })
        sendResponse(res, { statusCode: 201, success: true, message: "User registered successfully", data: result.rows[0] })
    } catch (error: any) {
        // res.status(500).json({
        //     "success": false,
        //     "message": error?.message,
        //     "errors": "Error details"
        // })
        sendResponse(res, { statusCode: 500, success: false, message: error?.message, error: error })
    }
}
export const userController = {
    createUser
}