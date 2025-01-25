type TMessageType = "text" | "action";
export type TChatType = "individual" | "group" | "none";

export interface ILastMessage {
  by?: string | undefined;
  message?: string;
  type?: TMessageType;
}

export interface IReaction {
  reaction: string;
  users: string[];
}

export interface IMessage {
  id: string;
  uid: string;
  text: string;
  reactions: IReaction[];
}

export interface IChatInfo {
  photos: number;
  videos: number;
  files: number;
  audio: number;
  links: number;
  voice: number;
}

export interface IChat {
  id: string;
  title: Record<string, string>;
  avatar: string | Record<string, string>;
  members: string[];
  messages: IMessage[];
  lastMessage: ILastMessage | null;
  updatedAt: number;
  unreadMessages: Record<string, number>;
  isPin: string[];
  chatType: TChatType;
  info: IChatInfo;
  order: Record<string, number> | null;
}
