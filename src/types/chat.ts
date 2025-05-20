import { IUserStatus } from "./user";

type TMessageType = "text" | "action";
export type TChatType = "individual" | "group" | "none";

export interface ILastMessage {
  senderId?: string | undefined;
  message?: string;
  type?: TMessageType;
  id: string;
  chatType: TChatType;
  text: string;
  timestamp: number;
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
  members: { [x: string]: boolean };
  messages: IMessage[];
  lastMessage: ILastMessage | null;
  updatedAt: number;
  unreadMessages: Record<string, number>;
  isPin: string[];
  isArchived?: boolean;
  chatType: TChatType;
  info: IChatInfo;
  order: Record<string, number> | null;
}

export interface IParticipantOnline {
  chatId: string;
  participant: string;
  title: string;
  avatar: string;
  userStatus: IUserStatus | null;
}
