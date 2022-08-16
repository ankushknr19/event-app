import './eventCard.css'

function EventCard({ event }) {
	return (
		<>
			<div className="event-card-container">
				<h1>{event.name}</h1>
				<p>{event.organizer}</p>
				<p>{event.date}</p>
				<p>{event.ticket.price}</p>
			</div>
		</>
	)
}

export default EventCard
