import mongoose, { Schema } from 'mongoose'

const CategorySchema = new Schema(
	{
		name: { type: String, required: true },
		types: [String],
		isActive: { type: Boolean, default: true },
	},
	{ timestamps: true }
)

export const CategoryModel = mongoose.model('Category', CategorySchema)
