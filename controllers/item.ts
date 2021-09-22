import { Request } from "express";
import { NextFunction, Response } from "express-serve-static-core";
import { MongoClient } from "mongodb";
import { config } from "../config";

export const newItem = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.info("server connection live");

	const uri = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@cluster0.wcadp.mongodb.net/aquinas?retryWrites=true&w=majority`;
	const client = new MongoClient(uri, {
		// useNewUrlParser: true,
		// useUnifiedTopology: true,
	});
	client.connect(async (err) => {
		try {
			const MOCKED_DOC = {
				book: "Jubilees",
				"location 1": 22,
				"location 2": 23,
			};
			const db = await client.db("aquinas");
			await db.collection(config?.COLLECTION_NAME).insertOne(MOCKED_DOC);
			await res.status(203).json({
				status: "success",
				data: MOCKED_DOC,
				params: req.params,
				query: req.query,
			});
			client.close();
		} catch (err) {
			await res.status(500).json({
				status: "error",
				data: { message: err?.message as string },
				query: req.query,
				params: req.params,
			});
			client.close();
		}
	});
};
