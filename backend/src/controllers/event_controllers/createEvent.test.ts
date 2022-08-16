import request from 'supertest'
import app from '../../index'

describe('POST /events', () => {
	const completeEventData = {
		name: 'Monsoon Acoustic Night',
		organizer: 'Grounds Nepal',
		category: 'music',
		event_type: 'live music',
		venue: 'Grounds Nepal',
		location: 'Bansbari, Dhapasi Marg',
		start_date: '2022-07-12',
		end_date: '2022-07-12',
		time: '4pm onwards',
		description: 'welcome',
		tags: ['live', 'Acoustic', 'fun'],
		ticket_type: 'paid',
		ticket_price: 500,
		image: 'fadfd',
		contact: [9812323412],
	}

	test('it should respond with 201', async () => {
		return await request(app)
			.post('/api/events')
			.send(completeEventData)
			.expect(201)
	})
})
