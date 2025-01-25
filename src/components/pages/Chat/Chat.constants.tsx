import { MdOutlineInsertPhoto } from "react-icons/md";
import { IoVideocamOutline } from "react-icons/io5";
import { CiFileOn, CiLink } from "react-icons/ci";
import { FaRegFileAudio } from "react-icons/fa";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { IMessage } from "@/types/chat";

export const CHAT_DETAILS = [
  {
    name: "photos",
    title: "photos",
    Icon: MdOutlineInsertPhoto,
    iconSize: 24,
  },
  {
    name: "videos",
    title: "videos",
    Icon: IoVideocamOutline,
    iconSize: 24,
  },
  {
    name: "files",
    title: "files",
    Icon: CiFileOn,
    iconSize: 24,
  },
  {
    name: "audio",
    title: "audio files",
    Icon: FaRegFileAudio,
    iconSize: 22,
  },
  {
    name: "links",
    title: "shared links",
    Icon: CiLink,
    iconSize: 25,
  },
  {
    name: "voice",
    title: "voice messages",
    Icon: MdOutlineKeyboardVoice,
    iconSize: 23,
  },
];

export const TEST_MESSAGES: IMessage[] = [
  {
    id: "2",
    uid: "2hzT8uBZHXQC8sQssNvZnglb7L53",
    text: "Jaden, my congratulations! I will be glad to work with you on a new project 😉",
    reactions: [],
  },
  {
    id: "4",
    uid: "xItTpjRcmXYJWHhVUpMhO9lX5R53",
    text: "Jaden, my congratulations! I will be glad to work with you on a new project 😉",
    reactions: [],
  },
];
