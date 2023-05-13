export interface IRanking {
  id: string;
  rankingOfUsers: IUserRanking[];
}

export interface IUserRanking {
  userId: string;
  userName: string;
  punctuation: number;
}
