import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

export const usePasswordVisibilityToggle = () => {
	const [visible, setVisible] = useState(false)

	const PasswordVisibilityIcon = (
		<FontAwesomeIcon
			icon={visible ? faEyeSlash : faEye}
			onClick={() => setVisible(!visible)}
		/>
	)
	const PasswordInputType = visible ? 'text' : 'password'

	return [PasswordVisibilityIcon, PasswordInputType]
}
