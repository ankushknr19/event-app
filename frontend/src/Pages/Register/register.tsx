import { dividerClasses } from '@mui/material'
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'

function Register() {
	const [register, setRegister] = useState({})

	return (
		<Formik
			initialValues={{
				email: '',
				password: '',
			}}
			validationSchema={Yup.object({
				email: Yup.string()
					.email('Incorrect email address.')
					.required('Email is required.'),
				password: Yup.string()
					.min(6, 'Password must be at least 6 characters long.')
					.max(30, 'Password must be less than 30 characters long.')
					.required('Password is required.'),
			})}
			onSubmit={async (values, { setSubmitting }) => {
				try {
					const response = await axios({
						method: 'post',
						url: 'https://localhost:5000/api/auth/register',
						data: JSON.stringify(values),
						headers: {
							'Content-Type': 'application/json',
						},
					})
					setRegister(response.data)
					console.log(response.data)
				} catch (error: any) {
					console.log(error.message)
				}
				setSubmitting(false)
			}}
		>
			<section className="form-card">
				<h1 className="form-title">Register</h1>
				<Form className="form">
					<div className="inputs-container">
						<label htmlFor="email">Email*</label>
						<Field
							name="email"
							type="email"
							className="form-input"
							placeholder="example@gmail.com"
						/>

						<div className="form-error">
							<p>
								<ErrorMessage name="email" />
							</p>
						</div>

						<label htmlFor="password">Password*</label>
						<Field
							name="password"
							type="password"
							className="form-input"
							placeholder="**********"
						/>

						<div className="form-error">
							<p>
								<ErrorMessage name="password" />
							</p>
						</div>
					</div>
					<button type="submit" className="btn btn-primary">
						Register
					</button>
				</Form>
			</section>
		</Formik>
	)
}

export default Register
