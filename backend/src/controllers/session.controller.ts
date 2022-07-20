import { Request, Response } from 'express'
import { userModel } from '../models/user.model'
import bcrypt from 'bcrypt'

export const userLogin = async (req: Request, res: Response) => {
	try {
		//get data from request after validating
		const { email, password } = req.body
		//find user using email
		const user = await userModel.findOne({ email })
		if (!user) {
			throw new Error('invalid email')
		}
		// check if password matches
		const isValidPassword = await bcrypt.compare(password, user.password)
		if (!isValidPassword) {
			throw new Error('invalid password')
		}
		// save logged-in user
		res.locals.userID = user.id
		//send response
		res.send('user logged in')
	} catch (error: any) {
		res.status(404).send(error.message)
	}
}
