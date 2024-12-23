export interface IUser {
  uid: string;
  email: string | null;
  displayName: string;
  createdAt: number;
  photoUrl: string;
  emailVerified: boolean;
  chats: string[];
  folders: string[];
  favorites: string;
}

export interface IUserStatus {
  state: "offline" | "online";
  updatedAt: number;
}
