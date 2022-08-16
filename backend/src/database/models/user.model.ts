import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		user_type: {
			type: String,
			enum: ['user', 'organizer', 'admin'],
			default: 'user',
			required: true,
		},

		refreshTokenId: { type: String },
	},
	{ timestamps: true }
)

export const UserModel = mongoose.model('User', userSchema)
