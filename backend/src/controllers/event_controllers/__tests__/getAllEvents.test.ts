import request from 'supertest'
import app from '../../../index'

describe('Test GET /events', () => {
	test('It should respond with 200 success', async () => {
		await request(app).get('/api/events').expect(200)
	})
})
