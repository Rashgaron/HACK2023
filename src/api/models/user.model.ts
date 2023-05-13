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
  products: {
    type: [],
    default: [],
  },
});

userSchema.index({ name: 1 }, { unique: true });

export default model<IUser>("User", userSchema);
