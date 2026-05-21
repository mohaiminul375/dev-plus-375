import type { Request, Response } from "express"
import { authService } from "./auth.service"
import { sendResponse } from "../../utility/sendResponse";

const LogInUser = async (req: Request, res: Response) => {
    try {
        const result = await authService.LoginUserIntoDB(req.body);
        const { accessToken, user } = result;
        res.status(200).json({
            "success": true,
            "message": "Login successful",
            "data": {
                "token": accessToken,
                "user": user
            }
        })
    } catch (error) {
        // pending
        console.error(error)
    }
}
export const authController = {
    LogInUser
}