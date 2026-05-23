import type { Response } from "express";
interface IResponse<T> {
    statusCode: number;
    success: boolean;
    message?: string;
    data?: T;
    error?: unknown;
}
// re-usable response handling
const sendResponse = <T>(res: Response, payload: IResponse<T>) => {
    res.status(payload?.statusCode).json({
        success: payload?.success,
        message: payload?.message,
        data: payload?.data,
        error: payload?.error
    })
}
export default sendResponse;