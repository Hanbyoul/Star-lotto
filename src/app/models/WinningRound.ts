import mongoose, { Schema, models, Document } from "mongoose";
export interface WinningNum extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  round: number;
  numbers: number[];
  drawDate: Date;
}

export const WinningNumSchema = new Schema<WinningNum>({
  round: {
    type: Number,
    required: true,
  },
  numbers: [{ type: Number }],
  drawDate: { type: Date, required: true },
});

export default mongoose.models.WinningRound ||
  mongoose.model("WinningRound", WinningNumSchema);
