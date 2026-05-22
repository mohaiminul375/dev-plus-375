import type { ErrorRequestHandler } from "express";

export const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err.stack); //disable in production
    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
}