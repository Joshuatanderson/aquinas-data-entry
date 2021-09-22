import { Request } from "express";
import { NextFunction, Response } from "express-serve-static-core";
import { MongoClient } from "mongodb";
import { config } from "../config";

export const newItem = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const uri = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@cluster0.wcadp.mongodb.net/aquinas?retryWrites=true&w=majority`;
	const client = new MongoClient(uri, {});
	client.connect(async (err) => {
		try {
			if (!req.body) {
				throw new Error(
					"This item has no request body.  I'm not sure what document you want me to create."
				);
			}

			const db = await client.db("aquinas");
			await db.collection(config?.COLLECTION_NAME).insertOne(req.body);
			await res.status(203).json({
				status: "success",
				data: req.body,
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

export const editItem = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const uri = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@cluster0.wcadp.mongodb.net/aquinas?retryWrites=true&w=majority`;
	const client = new MongoClient(uri, {});
	client.connect(async (err) => {
		try {
			if (!req.body) {
				throw new Error(
					"This item has no request body.  I'm not sure what document you want me to create."
				);
			}
			const db = await client.db("aquinas");
			await db
				.collection(config?.COLLECTION_NAME)
				.replaceOne(req.body.oldDoc, req.body.newDoc);

			res.status(203).json({
				status: "success",
				data: {
					message: "document successfully edited",
					newDocument: req.body.newDoc,
					oldDocument: req.body.oldDoc,
				},
				query: req.query,
				params: req.params,
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
