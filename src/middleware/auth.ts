import type { NextFunction, Request, Response } from "express"
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";
export const authorized = (...roles: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;
            console.log(token, 'token')
            if (!token) {
                throw new Error("Unauthorized access");
            }
            const decoded = jwt.verify(token as string, config.access_secrete as string) as JwtPayload;
            console.log(decoded, 'decoded')
            const userData = await pool.query(`
            SELECT * FROM users WHERE email=$1
            `, [decoded.email])
            const user = userData.rows[0];
            if (userData.rows.length === 0) {
                res.status(404).json({
                    success: false,
                    message: "User not found",
                })
            }
            if (roles.length && !roles.includes(user.role)) {
                res.status(403).json({
                    success: false,
                    message: "this role has no access"
                })
            }
            req.user = decoded;
            next();
        } catch (error) {
            next(error)
        }
    }
}
// export const authorizedMaintainer = () => {
//     return async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             const token = req.headers.authorization;
//             if (!token) {
//                 throw new Error("Unauthorized access");
//             }
//             const decoded = jwt.verify(token as string, config.access_secrete as string) as JwtPayload;

//             const userData = await pool.query(`
//             SELECT * FROM users WHERE email=$1
//             `, [decoded.email])
//             const user = userData.rows[0];
//             if (userData.rows.length === 0) {
//                 res.status(404).json({
//                     success: false,
//                     message: "User not found"
//                 })
//             }
//             if (user.role !== "maintainer") {
//                 res.status(403).json({
//                     success: false,
//                     message: "this role has no access"
//                 })
//             }
//             req.user = decoded;
//             next();
//         } catch (error) {
//             next(error)
//         }
//     }
// }