import { model, Schema } from "mongoose";
import { IRanking } from "./interfaces/IRanking";

const rankingSchema = new Schema({
  rankingOfUsers: {
    type: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        userName: {
          type: String,
          required: true,
        },
        punctuation: {
          type: Number,
          required: true,
        },
      },
    ],
    default: [],
  },
});

export default model<IRanking>("Ranking", rankingSchema);
