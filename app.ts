import express from "express"
import morgan from "morgan"
import dotenv from "dotenv"
import cors from "cors"

import {config} from "./config"

// const express = require("express");
// const morgan = require("morgan");
// const dotenv = require("dotenv");
// const cors = require("cors")

// const config = require("./config")

// console.log(process.env.U_SECRET_KEY);
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

// app.use("/api/v1/", testRouter)
// module.exports = app;
// export app;