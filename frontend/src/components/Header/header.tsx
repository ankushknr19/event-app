import './header.css'
import '../../stylesheets/buttons.css'
import { Link } from 'react-router-dom'

function Header() {
	return (
		<header className="main-header">
			<div className="main-header-container">
				<Link to="home">
					<div className="logo">
						<p className="primary-text">ANCX</p>
						<p className="secondary-text">EVENTS</p>
					</div>
				</Link>
				<div className="right-section">
					<Link to="create-event">
						<button className="btn btn-secondary btn-rounded">
							Create Event
						</button>
					</Link>
					<Link to="login">
						<button className="btn btn-primary btn-rounded">Login</button>
					</Link>
					<Link to="register">
						<button className="btn btn-secondary btn-rounded">
							Register
						</button>
					</Link>
				</div>
			</div>
		</header>
	)
}

export default Header
