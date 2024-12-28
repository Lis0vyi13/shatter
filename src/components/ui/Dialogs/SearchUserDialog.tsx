"use client";
import { useMemo, useState } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandList,
} from "../shadcn/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "../shadcn/dialog";

import AddChat from "../AddChat";
import SearchInput from "../Inputs/SearchInput";
import useFetchUsersChat from "@/components/Chat/ChatList/hooks/useFetchUsersChat";
import ChatListItem from "@/components/Chat/ChatList/ChatListItem";

import { IChat } from "@/types/chat";

interface ISearchUserDialog {
  data: IChat[] | null;
  createNewChat: (chatData: IChat) => Promise<void>;
  activeChat: string;
  setActiveChat: React.Dispatch<React.SetStateAction<string>>;
}

const SearchUserDialog = ({
  data,
  createNewChat,
  activeChat,
  setActiveChat,
}: ISearchUserDialog) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState<string>("");

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const users = useMemo(
    () => (data ? data.filter((user) => user.title !== "Favorites") : null),
    [data]
  );
  const { currentChats } = useFetchUsersChat(users, debouncedSearchValue);

  const searchInputProps = {
    name: "search",
    placeholder: "Search...",
    value: searchValue,
    setValue: setSearchValue,
    setDebouncedValue: setDebouncedSearchValue,
  };

  const handleSelectChat = (chat: IChat) => {
    if (chat.chatType === "none") {
      createNewChat(chat).then(() => setIsOpen(false));
    } else {
      setActiveChat(chat.id);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="outline-none" onClick={() => setIsOpen(true)}>
          <AddChat />
        </button>
      </DialogTrigger>

      <DialogOverlay className="fixed cursor-auto inset-0 bg-[#000] bg-opacity-80">
        <DialogContent className="fixed outline-none top-1/2 left-1/2 transform border-none -translate-x-1/2 sm:w-[450px] -translate-y-1/2 bg-white p-6 rounded-md shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-[16px]">Search user...</DialogTitle>
          </DialogHeader>
          <Command className="rounded-lg border-none border shadow-md w-full">
            <SearchInput
              className="py-3 text-[14px] placeholder:text-[14px] bg-[#fff] rounded-b-none"
              {...searchInputProps}
            />
            <CommandList className="max-h-[200px]">
              {currentChats && currentChats.length > 0 ? (
                <CommandGroup>
                  {currentChats.map((chat, index) => (
                    <ChatListItem
                      key={chat.id}
                      index={index}
                      {...chat}
                      isActive={chat.id == activeChat}
                      setChat={() => handleSelectChat(chat)}
                    />
                  ))}
                </CommandGroup>
              ) : (
                <CommandEmpty>No results found.</CommandEmpty>
              )}
            </CommandList>
          </Command>
          <DialogDescription className="hidden" />
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default SearchUserDialog;
