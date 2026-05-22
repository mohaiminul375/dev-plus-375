// const express = require('express')
import express, { type Application, type Request, type Response } from "express";
import { userRouter } from "./modules/users/users.route";
import { authRouter } from "./modules/auth/auth.route";
import { issueRouter } from "./modules/issue/issue.route";
import cors from 'cors';
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import sendResponse from "./utility/sendResponse";
import config from "./config";
const app: Application = express()

//middleware CORS
app.use(express.json());
const corsOption = {
    origin: config.origin_url,
    optionsSuccessStatus: 200
}
app.use(cors(corsOption));

// routes

// test server
app.get('/', (req: Request, res: Response) => {
    sendResponse(res, { statusCode: 200, success: true, message: "dev plus server is working" })
})
app.use('/api/auth/signup', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/issues', issueRouter)
// Global Error Handling Middleware
app.use(globalErrorHandler);
export default app;