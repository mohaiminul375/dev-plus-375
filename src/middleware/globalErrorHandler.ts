import type { ErrorRequestHandler } from "express";
import config from "../config";

export const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err.stack); //disable in production
    res.status(500).json({
        success: false,
        message: err?.message || "Internal Server Error",
        stack: config.node_env === "development" && err ? err?.stack : undefined, //stack error only for during dev mode
    });
}