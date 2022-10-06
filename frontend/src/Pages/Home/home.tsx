import axios from '../../api/axios'
import { useEffect, useState } from 'react'
import EventCard from '../../components/EventCard/eventCard'

const ALL_EVENTS_URL = '/events'

function Home() {
	const [events, setEvents] = useState([])

	useEffect(() => {
		async function fetchEvents() {
			try {
				const response = await axios({
					method: 'get',
					baseURL: 'https://localhost:5000/api',
					url: 'events',
					headers: {
						'Content-Type': 'application/json',
					},
				})

				setEvents(response.data)
			} catch (error: any) {
				console.log(error.message)
			}
		}
		fetchEvents()
	}, [])

	return (
		<>
			{events?.map((event) => (
				<EventCard event={event} />
			))}
		</>
	)
}

export default Home
