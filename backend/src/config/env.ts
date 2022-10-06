import dotenv from 'dotenv'

dotenv.config()

export const PORT = (process.env.PORT || 5000) as number
export const NODE_ENV = process.env.NODE_ENV as string
export const MONGO_COMPASS_URI = process.env.MONGO_COMPASS_URI as string
export const SALT_ROUND = process.env.SALT_ROUND
export const ACCESS_TOKEN_SECRET_KEY = process.env
	.ACCESS_TOKEN_SECRET_KEY as string
export const REFRESH_TOKEN_SECRET_KEY = process.env
	.REFRESH_TOKEN_SECRET_KEY as string
export const ACCESS_TOKEN_TIME_TO_LIVE = process.env
	.ACCESS_TOKEN_TIME_TO_LIVE as string
export const REFRESH_TOKEN_TIME_TO_LIVE = process.env
	.REFRESH_TOKEN_TIME_TO_LIVE as string
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string
export const GOOGLE_REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL as string
export const GOOGLE_TOKEN_URL = process.env.GOOGLE_TOKEN_URL as string
export const GOOGLE_JWKS_URL = process.env.GOOGLE_JWKS_URL as string
export const GOOGLE_JWKS_ISSUER = process.env.GOOGLE_JWKS_ISSUER as string
export const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN as string
