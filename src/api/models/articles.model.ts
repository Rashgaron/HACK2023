import { Schema, model } from "mongoose";
import { IArticle } from "./interfaces/IArticle";

const articleSchema = new Schema({
  title: String,
  description: String,
  image_url: String,
  price: Number,
});

export default model<IArticle>("Article", articleSchema);
