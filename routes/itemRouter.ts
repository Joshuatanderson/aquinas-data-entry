import express from "express";

import { editItem, newItem } from "../controllers/item";

export const router = express.Router();

// TODO: change to post request
// TODO: change to accept a doc as a param
// TODO: add a put/patch handler
router.route("/").post(newItem);
router.route("/").put(editItem);
