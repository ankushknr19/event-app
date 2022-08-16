import { Request, Response } from 'express'
import { CategoryModel } from '../../models/category.model'

// @desc get all category data
// GET api/event/category
// ACCESS private/admin
export async function createCategory(req: Request, res: Response) {
	try {
		const { name, types } = req.body

		const newCategory = await CategoryModel.create({ name, types })

		res.status(201).send(newCategory)
	} catch (error: any) {
		res.status(404).send(error.message)
	}
}

// @desc get all category data
// GET api/event/category
// ACCESS public
export async function getAllCategory(_req: Request, res: Response) {
	try {
		const allCategory = await CategoryModel.find()

		if (!allCategory) throw new Error('no category found')
		res.status(201).send(allCategory)
	} catch (error: any) {
		res.status(404).send(error.message)
	}
}
