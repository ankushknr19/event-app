import '../../stylesheets/form.css'
import '../../stylesheets/buttons.css'
import { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { usePasswordVisibilityToggle } from '../../Hooks/PasswordToggle'
import * as Yup from 'yup'
import axios from 'axios'

function Login() {
	const [login, setLogin] = useState({})
	const [PasswordVisibilityIcon, PasswordInputType] =
		usePasswordVisibilityToggle()

	return (
		<Formik
			initialValues={{
				email: '',
				password: '',
			}}
			validationSchema={Yup.object({
				email: Yup.string()
					.email('Incorrect email address')
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
						url: 'http://localhost:5000/api/auth/login',
						data: JSON.stringify(values),
						headers: {
							'Content-Type': 'application/json',
						},
					})
					setLogin(response.data)
					console.log(response.data)
				} catch (error: any) {
					console.log(error.message)
				}
				// alert(JSON.stringify(values, null, 2))
				setSubmitting(false)
			}}
		>
			<section className="form-card">
				<h1 className="form-title">Sign In</h1>
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
						<div className="input-with-icon">
							<p className="input-icon-right">
								{PasswordVisibilityIcon}
							</p>
							<Field
								name="password"
								type={PasswordInputType}
								className="form-input"
								placeholder="**********"
							/>
						</div>
						<div className="form-error">
							<p>
								<ErrorMessage name="password" />
							</p>
						</div>
					</div>
					<button type="submit" className="btn btn-primary">
						Login
					</button>
				</Form>
			</section>
		</Formik>
	)
}

export default Login
