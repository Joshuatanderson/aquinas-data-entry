import { Request } from "express";
import { NextFunction, Response } from "express-serve-static-core";

export const test = async(req: Request, res: Response, next: NextFunction) => {
	try {
		await res.status(203).json({
			status: "success",
			data: {message: "Your test request succeeded"}
		})
	} catch (err){
		await res.status(500).json({
			status: "error",
			data: { message: err?.message as string },
			query: req.query,
			params: req.params,
		});
	}
}