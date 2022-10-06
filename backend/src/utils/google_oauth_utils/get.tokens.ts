import {
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	GOOGLE_REDIRECT_URL,
	GOOGLE_TOKEN_URL,
} from '../../config/env'
import axios from 'axios'
import logger from '../../middlewares/winstonLogger'

//post request to https://oauth2.googleapis.com/token
// content-type: application/x-www-form-urlencoded

interface GoogleTokensResult {
	access_token: string
	expires_in: Number
	refresh_token: string
	scope: string
	id_token: string
}

export async function getGoogleOAuthTokens({
	code,
}: {
	code: string
}): Promise<GoogleTokensResult> {
	const values = {
		code,
		client_id: GOOGLE_CLIENT_ID,
		client_secret: GOOGLE_CLIENT_SECRET,
		redirect_uri: GOOGLE_REDIRECT_URL,
		grant_type: 'authorization_code',
	}

	const params = new URLSearchParams(values)

	const config = {
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
		},
	}

	try {
		const result = await axios.post<GoogleTokensResult>(
			GOOGLE_TOKEN_URL,
			params.toString(),
			config
		)
		return result.data
	} catch (error: any) {
		logger.debug(error.response.data.error)
		logger.error(error, 'Failed to fetch Google Oauth Tokens')
		throw new Error(error.message)
	}
}
