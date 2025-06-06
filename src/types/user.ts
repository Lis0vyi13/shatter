export interface IUser {
  uid: string;
  email: string | null;
  displayName: string;
  createdAt: number;
  photoUrl: string;
  chats: string[];
  folders: string[];
  favorites: string;
  banner: string;
  updatedAt: string;
  birthday: number | null;
  username: string;
  phoneNumber: string;
}

export interface IUserStatus {
  state: "offline" | "online";
  updatedAt: number;
}
