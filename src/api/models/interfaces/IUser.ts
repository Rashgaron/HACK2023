import { IArticle } from "./IArticle";

export interface IUser {
  id: string;
  name: string;
  totalPunctuation: number;
  coins: number;
  color: string;
  maxPunctuations: number[];
  products: IArticle[];
}
