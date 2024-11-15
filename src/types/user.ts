export interface UserData {
  uid: string;
  email: string | null;
  displayName: string;
  createdAt: number;
  photoUrl: string;
  emailVerified: boolean;
}
