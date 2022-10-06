import createHttpError from 'http-errors'
import { NextFunction, Request, Response } from 'express'
import { CategoryModel } from '../../models/category.model'
import { categorySchema } from '../../schemas/category.schema'

// @desc create new category data
// POST api/events/categories
// ACCESS private/admin
export async function createCategoryController(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const result = await categorySchema.validateAsync(req.body)

		const { name, types } = result

		const newCategory = await CategoryModel.create({ name, types })

		res.status(201).send(newCategory)
	} catch (error: any) {
		if (error.isJoi) error.status = 422

		next(error)
	}
}

// @desc get all category data
// GET api/event/category
// ACCESS public
export async function getAllCategoryController(
	_req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const allCategory = await CategoryModel.find()

		if (allCategory.length === 0) throw new createHttpError.NotFound()

		res.status(200).send(allCategory)
	} catch (error: any) {
		next(error)
	}
}
