import dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import { connectDB } from './utils/db.connect'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import { deserializeUser } from './middlewares/deserializeUser'

dotenv.config()
const app = express()

app.use(express.json())
app.use(helmet())
app.use(deserializeUser)

connectDB()

app.use('/api/auth', authRoutes)
app.use('/api/me', userRoutes)

app.get('/', (_req, res) => {
	res.send('api is running...')
})

const PORT = process.env.PORT

app.listen(PORT, () =>
	console.log(`server is running on port http://localhost:${PORT}....`)
)
