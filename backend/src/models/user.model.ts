import mongoose, { Schema } from 'mongoose'

export interface UserDocument extends mongoose.Document {
	email: string
	password?: string
	googleId?: string
	role: string
	refreshTokenId: string
	isSocial: boolean
	isActive: boolean
	createdAt: Date
	updatedAt: Date
}

const UserSchema = new Schema(
	{
		email: { type: String, required: true, lowercase: true, unique: true },
		password: { type: String },
		googleId: { type: String },

		role: {
			type: String,
			enum: ['user', 'organizer', 'admin'],
			default: 'user',
		},

		refreshTokenId: { type: String },
		isSocial: { type: Boolean, default: false },
		isActive: { type: Boolean, default: true },
	},
	{ timestamps: true }
)

export const UserModel = mongoose.model<UserDocument>('User', UserSchema)
