import { ReactElement } from "react";

export interface IFolder {
  id: string;
  Icon?: ReactElement;
  title: string;
  type: "all" | "archive";
  unreaded: number;
  href?: string;
}

export interface ISettings extends Omit<IFolder, "type" | "unreaded" | "id"> {
  id?: string;
  type?: string;
}

export interface ILogoutIcon {
  Icon: ReactElement;
  title: string;
  href?: string;
}

export type TUnreadMessages = Record<string, number>;
