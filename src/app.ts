// const express = require('express')
import express, { type Application, type Request, type Response } from "express";
import { userRouter } from "./modules/users/users.route";
import { authRouter } from "./modules/auth/auth.route";
import { issueRouter } from "./modules/issue/issue.route";
const app: Application = express()
//middleware CORS
app.use(express.json());
// routes
app.use('/api/auth/signup', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/issues', issueRouter)
// test server
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'dev-plus server is working.!'
    })
})
export default app;