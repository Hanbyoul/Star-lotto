import mongoose, { ObjectId, Schema, models, Document } from "mongoose";

type rankType = 1 | 2 | 3 | 4 | 5 | "lose" | null;
export interface LotterySchema extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  createAt: Date;
  owner: ObjectId;
  round: number;
  numbers: number[];
  status: "Pending" | "Succeed";
  rank: rankType;
}

export const LotterySchema = new Schema<LotterySchema>({
  createAt: {
    type: Date,
    required: true,
    default: Date.now, // 반환값은 number
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
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },
});

export default mongoose.models.Lottery ||
  mongoose.model("Lottery", LotterySchema);
