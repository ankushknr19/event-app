import mongoose from 'mongoose'
import { MONGO_COMPASS_URI } from '../config/env'

export function connectDB() {
	try {
		const dbURI: string = MONGO_COMPASS_URI || ''
		mongoose.connect(dbURI, () =>
			console.log('Database connected successfully!')
		)
	} catch (error) {
		console.log('error during inital connection to mongodb database')
		process.exit(1)
	}
	mongoose.set('debug', true)
}
