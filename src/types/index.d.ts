import type { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                name: string;
                email: string;
                password: string;
                role: "contributor" | "maintainer",
            }
        }
    }
}