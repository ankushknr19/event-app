import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import { CategoryModel } from '../../database/models/category.model'

// @desc create an eventv category
// GET api/event/category
// ACCESS private/admin
export async function createCategory(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { name, types } = req.body

		const newCategory = await CategoryModel.create({ name, types })

		res.status(201).send(newCategory)
	} catch (error: any) {
		next(error)
	}
}

// @desc get all category data
// GET api/event/category
// ACCESS public
export async function getAllCategory(
	_req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const allCategory = await CategoryModel.find()

		if (!allCategory) throw new createHttpError.NotFound()
		res.status(201).send(allCategory)
	} catch (error: any) {
		next(error)
	}
}
