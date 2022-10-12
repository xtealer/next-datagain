export enum RewardAction {
  CREATE = "create",
  UPDATE = "update",
}

export interface Reward {
  created: Date;
  amount: number;
  action: RewardAction;
  userId: string;
  documentId: string;
}
