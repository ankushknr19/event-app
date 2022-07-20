import dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import { connectDB } from './utils/db.connect'
import userRoutes from './routes/user.routes'
import sessionRoutes from './routes/session.routes'

dotenv.config()
const app = express()

app.use(express.json())
app.use(helmet())

connectDB()

app.use('/api/users', userRoutes)
app.use('/api/session', sessionRoutes)

app.get('/', (_req, res) => {
	res.send('api is running...')
})

const PORT = process.env.PORT

app.listen(PORT, () =>
	console.log(`server is running on port http://localhost:${PORT}....`)
)
