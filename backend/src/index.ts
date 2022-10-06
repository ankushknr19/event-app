import fs from 'fs'
import cors from 'cors'
import https from 'https'
import helmet from 'helmet'
import express from 'express'
import { PORT } from './config/env'
import cookieParser from 'cookie-parser'
import createHttpError from 'http-errors'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import { connectDB } from './config/db.connect'
import eventRoutes from './routes/event.routes'
import logger from './middlewares/winstonLogger'
import { limiter } from './middlewares/rateLimit'
import morganLogger from './middlewares/morganLogger'
import { errorHandler } from './middlewares/errorHandler'
import { deserializeUser } from './middlewares/deserializeUser'

const app = express()

app.use(cors())
app.use(helmet())
app.use(limiter)
app.use(express.json({ limit: '2mb' }))
app.use(cookieParser())
app.use(deserializeUser)
app.use(morganLogger)

connectDB()

app.use('/api/auth', authRoutes)
app.use('/api/me', userRoutes)
app.use('/api/events', eventRoutes)

app.get('/', (_req, res) => {
	res.send('api is running...')
})

// if route doesnot exist
app.use((_req, _res, next) => {
	next(new createHttpError.NotFound())
})

app.use(errorHandler)

const server = https
	.createServer(
		{
			key: fs.readFileSync('key.pem'),
			cert: fs.readFileSync('cert.pem'),
		},
		app
	)
	.listen(PORT, () =>
		logger.info(`server is running on port https://localhost:${PORT}....`)
	)

process.on('SIGTERM', () => {
	server.close(() => logger.warn('process terminated'))
})

export default app
