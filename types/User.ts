export enum UserRole {
  COMPANY = "company",
  CUSTOMER = "customer",
}

export interface UserFirestoreData {
  documentId: string;
  role: UserRole;
  email: string;
  metamaskId: string | null;
  firstName: string;
  lastName: string;
  lastActivity: Date;
  updated: Date;
  created: Date;
  points: number;
  sharingPreferences: Record<string, boolean>;
}
