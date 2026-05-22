import type { NextFunction, Request, Response } from "express"
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";
type ROLES = "contributor" | "maintainer";
export const authorized = (...roles: ROLES[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;
            if (!token) {
                throw new Error("Unauthorized access");
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
                res.status(404).json({
                    success: false,
                    message: "User not found",
                })
            }
            //role base access
            if (roles.length && !roles.includes(user.role)) {
                res.status(403).json({
                    success: false,
                    message: "this role has no access"
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