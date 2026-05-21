// const express = require('express')
import express, { type Application } from "express";
const app: Application = express()
const port = 8800

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})