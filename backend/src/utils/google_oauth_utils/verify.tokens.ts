import jwksClient from 'jwks-rsa'
import jwt from 'jsonwebtoken'
import {
	GOOGLE_CLIENT_ID,
	GOOGLE_JWKS_URL,
	GOOGLE_JWKS_ISSUER,
} from '../../config/env'
import logger from '../../middlewares/winstonLogger'

export const verifyIdToken = async (token: string) => {
	try {
		const client = jwksClient({
			jwksUri: GOOGLE_JWKS_URL,
		})

		const unverifiedToken = jwt.decode(token, { complete: true })
		const kid = unverifiedToken!.header.kid

		const key = await client.getSigningKey(kid)
		const signingKey = key.getPublicKey()

		const options = {
			audience: GOOGLE_CLIENT_ID,
			issuer: GOOGLE_JWKS_ISSUER,
		}

		let decoded
		jwt.verify(token, signingKey, options, function (err, data) {
			if (err) throw new Error()
			decoded = data
		})
		logger.debug({ decoded: decoded })
		return {
			valid: true,
			expired: false,
			decoded,
		}
	} catch (error: any) {
		return {
			valid: false,
			expired: true,
			decoded: null,
		}
	}
}

/*
decoded data example:
{
  iss: 'https://accounts.google.com',
  azp: '677813309461-1rlni63momc208vcg2ig3m0ma94or6rc.apps.googleusercontent.com',
  aud: '677813309461-1rlni63momc208vcg2ig3m0ma94or6rc.apps.googleusercontent.com',
  sub: '107343309365450909291',
  email: 'anq.qnr@gmail.com',
  email_verified: true,
  at_hash: 'CjZfYw4K1t-P6OY0l80KAA',
  iat: 1665041125,
  exp: 1665044725
}
*/
