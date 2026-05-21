// const express = require('express')
import express, { type Application, type Request, type Response } from "express";
import { userRouter } from "./modules/users/users.route";
const app: Application = express()
// 
app.use(express.json());
app.use('/api/auth/signup', userRouter)
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'dev-plus server is working.!'
    })
})

export default app;