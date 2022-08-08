import express from 'express'
import { requireUser } from '../middlewares/requireUser'

const router = express.Router()

router.route('/profile').get(requireUser, (_req, res) => {
	res.send(`welcome user ${res.locals.user?.userId}`)
})

export default router
