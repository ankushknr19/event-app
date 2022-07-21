import jwt from 'jsonwebtoken'

//sign jwt
export const signJwt = (
	payload: Object,
	options?: jwt.SignOptions | undefined
) => {
	return jwt.sign(payload, process.env.jwtAccessTokenSecretKey!, options)
}

//verify jwt
export const verifyJwt = (token: string) => {
	try {
		//decode token
		const decoded = jwt.verify(token, process.env.jwtAccessTokenSecretKey!)
		return {
			valid: true,
			expired: false,
			decoded,
		}
	} catch (error: any) {
		return {
			valid: false,
			expired: error.message === 'jwt token expired',
			decoded: null,
		}
	}
}
