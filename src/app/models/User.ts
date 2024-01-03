import bcrypt from "bcrypt";
import mongoose, { Schema, models } from "mongoose";

export interface UserAuth {
  userId: string;
  password: string;
}

export type SignUser = Partial<UserAuth>;

export interface UserSchema {
  _id: mongoose.Schema.Types.ObjectId;
  userId: string;
  password: string;
}

export const UserSchema = new Schema<UserAuth>({
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
});

UserSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
