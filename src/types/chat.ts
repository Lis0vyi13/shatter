import { StaticImageData } from "next/image";

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
  title: {
    [key: string]: string;
  };
  avatar:
    | {
        [key: string]: string;
      }
    | StaticImageData;
  members: string[];
  messages: IMessage[];
  lastMessage: ILastMessage | null;
  updatedAt: number;
  unreadMessages: {
    [key: string]: number;
  };
  isPin: string[];
  chatType: TChatType;
  info: IChatInfo;
  order: {
    [key: string]: number;
  } | null;
}
