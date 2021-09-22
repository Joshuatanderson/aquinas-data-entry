import express from "express"

import {test} from "../controllers/test"

export const router = express.Router()

router.route('/').get(test)

