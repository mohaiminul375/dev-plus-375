// const express = require('express')
import express, { type Application } from "express";
const app: Application = express()
const port = 8800

app.get('/', (req, res) => {
    res.send('Hello World!')
})

export default app;