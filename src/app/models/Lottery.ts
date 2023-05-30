import mongoose, { ObjectId, Schema, models } from "mongoose";

interface Lottery {
  createAt: Date;
  owner: ObjectId;
  round: Number;
  numbers: number[];
  status: "Pending" | "Succeed";
  rank: number | null;
}

export const LotterySchema = new Schema<Lottery>({
  createAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  round: {
    type: Number,
    required: true,
  },
  numbers: [{ type: Number }], // 로또 숫자 6개저장
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
  rank: {
    type: Number,
    default: null,
  },
});

export default mongoose.models.Lottery ||
  mongoose.model("Lottery", LotterySchema);
