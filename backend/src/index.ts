import dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectDB } from './utils/db.connect'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import eventRoutes from './routes/event.routes'
import { limiter } from './middlewares/rateLimit'

dotenv.config()
const app = express()

app.use(
	cors({
		origin: 'http://127.0.0.1:5173',
	})
)
app.use(helmet())
app.use(limiter)
app.use(express.json())
app.use(cookieParser())

connectDB()

app.use('/api/auth', authRoutes)
app.use('/api/me', userRoutes)
app.use('/api/events', eventRoutes)

app.get('/', (_req, res) => {
	res.send('api is running...')
})

const PORT = process.env.PORT

app.listen(PORT, () =>
	console.log(`server is running on port http://localhost:${PORT}....`)
)

export default app
