import type { Request, Response } from "express"
import { authService } from "./auth.service"

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
        // re-work
        console.error(error)
    }
}
export const authController = {
    LogInUser
}