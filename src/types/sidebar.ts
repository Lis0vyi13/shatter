import { ReactElement } from "react";

export interface IFolder {
  id: string;
  Icon?: ReactElement;
  title: string;
  isActive: boolean;
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
  isActive: boolean;
}

export type TUnreadMessages = Record<string, number>;
