import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const { mongoCompassURI } = process.env

export async function connectDB() {
	try {
		const dbURI: string = mongoCompassURI || ''
		await mongoose.connect(dbURI)
	} catch (error) {
		console.log('error during inital connection to mongodb database')
	}

	mongoose.set('debug', true)
}
