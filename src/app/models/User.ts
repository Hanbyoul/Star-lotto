import bcrypt from 'bcrypt';
import mongoose, { Schema, Document } from 'mongoose';

export interface UserAuth {
	userId: string;
	password: string;
}

export interface IUserSchema extends Document {
	_id: mongoose.Schema.Types.ObjectId;
	userId: string;
	password: string;
	lotto?: mongoose.Schema.Types.ObjectId[];
	createAt: Date;
	email: string;
}

export const UserSchema = new Schema<IUserSchema>({
	userId: {
		type: String,
		unique: true,
		required: true,
		match: /[a-z0-9_]{4,16}/,
	},
	password: {
		type: String,
		required: true,
	},
	createAt: {
		type: Date,
		required: true,
		default: Date.now, // 반환값은 number
	},
	lotto: [
		{ type: mongoose.Schema.Types.ObjectId, ref: 'Lottery', required: true },
	],
	email: {
		type: String,
		required: true,
		match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
	},
});

UserSchema.pre('save', async function () {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 5);
	}
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
