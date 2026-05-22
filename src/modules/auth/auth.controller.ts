import type { Request, Response } from "express"
import { authService } from "./auth.service"
import sendResponse from "../../utility/sendResponse";
// login and set token
const LogInUser = async (req: Request, res: Response) => {
    try {
        const result = await authService.LoginUserIntoDB(res, req.body);
        const { accessToken, user } = result;
        // return to user access token and user obj
        sendResponse(res, {
            statusCode: 200, success: true, message: "Login successful", data: {
                token: accessToken,
                user: user
            }
        })

    } catch (error) {
        sendResponse(res, {
            statusCode: 500, success: false, message: "Login failed due to internal server error", error: error
        })
    }
}
export const authController = {
    LogInUser
}