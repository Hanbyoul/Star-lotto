import { Mongoose } from "mongoose";
import mongoose, { Schema, models } from "mongoose";
declare global {
  var mongoose: {
    promise: Promise<Mongoose> | null;
    conn: Mongoose | null;
  };
}

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
