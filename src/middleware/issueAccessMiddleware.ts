import type { NextFunction, Request, Response } from "express";
import { pool } from "../db";
import sendResponse from "../utility/sendResponse";

export const issueAccMiddleware = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user;
            const reqId = req.params.id;
            // query the updated id
            const result = (await pool.query(`SELECT * FROM issues WHERE id=$1`, [reqId])).rows[0];
            if (!result) {
                sendResponse(res, { statusCode: 404, success: false, message: "Issue not founded" })
            }
            // no restriction for maintainer
            if (user?.role === "maintainer") {
                next();
                return
            }
            // valid contributor
            if (user?.role === "contributor" && result.reporter_id === user.id && result.status === 'open') {
                next()
                return
            }
            sendResponse(res, { statusCode: 403, success: false, message: "Forbidden access" })
            next()
        } catch (error) {
            next(error)
        }
    }
}