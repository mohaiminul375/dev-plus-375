import type { ErrorRequestHandler } from "express";
import config from "../config";
// global error handle
export const globalErrorHandler: ErrorRequestHandler = (
    err,
    req,
    res,
    next
) => {
    // console.error(err.stack);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        stack: config.node_env === "development" ? err.stack : undefined,
    });
};