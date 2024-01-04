import bcrypt from "bcrypt";
import mongoose, { Schema, models, Document } from "mongoose";

export interface UserAuth {
  userId: string;
  password: string;
}

export type SignUser = Partial<UserAuth>;

export interface UserSchema extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  userId: string;
  password: string;
  lotto?: mongoose.Schema.Types.ObjectId[];
}

export const UserSchema = new Schema<UserSchema>({
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
  lotto: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Lottery", required: true },
  ],
});

/**
 * TODO:로또 save 후 업데이트가안됨
 */

UserSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
