import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login/login'
import Home from './Pages/Home/home'
import Header from './components/Header/header'
import Profile from './Pages/Profile/profile'
import CreateEvent from './Pages/Organizer/Dashboard/createEvent'
import Register from './Pages/Register/register'

function App() {
	return (
		<div className="App">
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="home" element={<Home />} />
				<Route path="register" element={<Register />} />
				<Route path="login" element={<Login />} />
				<Route path="profile" element={<Profile />} />
				<Route path="create-event" element={<CreateEvent />} />
			</Routes>
		</div>
	)
}

export default App
