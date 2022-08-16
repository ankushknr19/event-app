function CreateEvent() {
	return (
		<>
			<section className="form-card">
				<h1 className="form-title">Create New Event</h1>
				<form action="" id="createEventForm" className="form">
					<div className="form-inputs">
						<label htmlFor="name">Event Name</label>
						<input
							id="name"
							name="name"
							type="name"
							className="form-input"
						/>
						<label htmlFor="organizer">Organizer</label>
						<input
							id="organizer"
							name="organizer"
							type="text"
							className="form-input"
						/>

						<label htmlFor="category">Category</label>
						<input
							id="category"
							name="category"
							type="text"
							className="form-input"
						/>

						<label htmlFor="event_type">Type</label>
						<input
							id="event_type"
							name="event_type"
							type="text"
							className="form-input"
						/>

						<label htmlFor="venue">Venue</label>
						<input
							id="venue"
							name="venue"
							type="text"
							className="form-input"
						/>

						<label htmlFor="location">Location</label>
						<input
							id="location"
							name="location"
							type="text"
							className="form-input"
						/>
						<label htmlFor="start_date">Start Date</label>
						<input
							id="start_date"
							name="start_date"
							type="text"
							className="form-input"
						/>
						<label htmlFor="end_date">End Date</label>
						<input
							id="end_date"
							name="end_date"
							type="text"
							className="form-input"
						/>
						<label htmlFor="time">Time</label>
						<input
							id="time"
							name="time"
							type="text"
							className="form-input"
						/>
						<label htmlFor="description">Description</label>
						<textarea
							rows={4}
							cols={50}
							id="description"
							name="description"
							form="createEventForm"
							className="form-input form-textarea"
						/>
						<label htmlFor="tags">Tags</label>
						<input
							id="tags"
							name="tags"
							type="text"
							className="form-input"
						/>
						<label htmlFor="ticket_type">Ticket type</label>
						<input
							id="ticket_type"
							name="ticket_type"
							type="text"
							className="form-input"
						/>
						<label htmlFor="ticket_price">Ticket price</label>
						<input
							id="ticket_price"
							name="ticket_price"
							type="text"
							className="form-input"
						/>
						<label htmlFor="image">Image</label>
						<input
							id="image"
							name="image"
							type="text"
							className="form-input"
						/>
						<label htmlFor="contact">Contact</label>
						<input
							id="contact"
							name="contact"
							type="tel"
							className="form-input"
						/>
					</div>

					<button type="submit" className="btn btn-primary">
						Create Event
					</button>
				</form>
			</section>
		</>
	)
}

export default CreateEvent
