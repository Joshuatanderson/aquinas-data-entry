import {config} from "./config"

import express from "express"
import morgan from "morgan"
import cors from "cors"

import { router as testRouter } from "./routes/testRouter"

const x = config;
console.log(x)

// const express = require("express");
// const morgan = require("morgan");
// const dotenv = require("dotenv");
// const cors = require("cors")

// const config = require("./config")

export const app = express();
// routes


// middleware

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	next();
});

app.use("/api/v1/test", testRouter)
// module.exports = app;
// export app;