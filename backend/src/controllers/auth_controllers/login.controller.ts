import { Request, Response } from 'express'
import { userModel } from '../../models/user.model'
import bcrypt from 'bcrypt'
import { signJwt } from '../../utils/jwt.utils'

export const userLoginController = async (req: Request, res: Response) => {
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
		//create access token
		const accessToken = signJwt(
			{ userId: user._id },
			{ expiresIn: process.env.accessTokenTimeToLive }
		)

		//store token in cookie
		res.cookie(user._id.toString(), accessToken, {
			path: '/',
			expires: new Date(Date.now() + 1000 * 30),
			httpOnly: true,
			sameSite: 'lax',
		})
		//create refresh token
		//return tokens
		res.status(200).send({
			message: 'Sucessfully logged in',
			user: user._id,
			accessToken,
		})
	} catch (error: any) {
		res.status(404).send(error.message)
	}
}
