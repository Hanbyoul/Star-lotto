import { Mongoose } from "mongoose";
import mongoose, { Schema, models } from "mongoose";
declare global {
  var mongoose: {
    promise: Promise<Mongoose> | null;
    conn: Mongoose | null;
  };
}
