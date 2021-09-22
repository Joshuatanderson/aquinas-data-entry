import express from "express";

import { newItem } from "../controllers/item";

export const router = express.Router();

router.route("/").get(newItem);
