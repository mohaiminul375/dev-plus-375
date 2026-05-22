import type { NextFunction, Request, Response } from "express"
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";
import sendResponse from "../utility/sendResponse";
type ROLES = "contributor" | "maintainer";
export const authorized = (...roles: ROLES[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;
            if (!token) {
                sendResponse(res, {
                    statusCode: 401,
                    success: false,
                    message: "Unauthorized access"
                })
            }
            // decode to verify
            const decoded = jwt.verify(token as string, config.access_secrete as string) as JwtPayload;
            // query by decode data
            const userData = await pool.query(`
            SELECT * FROM users WHERE email=$1
            `, [decoded.email])
            // if not found from decode
            const user = userData.rows[0];
            if (userData.rows.length === 0) {
                sendResponse(res, {
                    statusCode: 401,
                    success: false,
                    message: "Unauthorized access"
                })
            }
            //role base access
            if (roles.length && !roles.includes(user.role)) {
                sendResponse(res, {
                    statusCode: 403,
                    success: false,
                    message: "Forbidden access"
                })
            }
            // push User to header
            req.user = decoded;
            next();
        } catch (error) {
            next(error)
        }
    }
}