import { model, Schema } from "mongoose";
import { IUser } from "./interfaces/IUser";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  punctuation: {
    type: Number,
    default: 0,
  },
  coins: {
    type: Number,
    default: 0,
  },
  maxPunctuations: {
    type: [Number],
    default: [],
  },
  totalPunctuation: {
    type: Number,
    default: 0,
  },
  color: {
    type: String,
    default: "FFFFFF",
  },
  products: {
    type: [],
    default: [
      {
        title: "FFFFFF",
        description: "White",
        price: 0,
        _id: "646006967e0eb5793b0e2e4a",
      },
    ],
  },
});

userSchema.index({ name: 1 }, { unique: true });

export default model<IUser>("User", userSchema);
