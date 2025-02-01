import { MutableRefObject, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux/app/hooks";
import {
  Command,
  CommandGroup,
  CommandList,
  CommandEmpty,
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

import { cn, scrollToChatLink } from "@/utils";
import useUser from "@/hooks/useUser";

import AddChatButton from "../AddChatButton";
import SearchInput from "../Inputs/SearchInput";
import useFetchUsersChat from "@/components/pages/Chat/ChatList/hooks/useFetchUsersChat";
import ChatListItem from "@/components/pages/Chat/ChatList/ChatListItem";
import Loader from "../Loader";

import { IChat } from "@/types/chat";
import SkeletonChatListItem from "@/components/pages/Chat/ChatList/ChatListItem.skeleton";
import NotFound from "@/components/pages/Chat/ChatList/NotFound";

interface ISearchUserDialog {
  data: IChat[] | null;
  listRef: MutableRefObject<HTMLDivElement | null>;
  handleCreateNewChat: (chatData: IChat) => Promise<void>;
  handleSetActiveChat: (id: string) => void;
  className?: string;
}

const SearchUserDialog = ({
  data,
  listRef,
  handleCreateNewChat,
  handleSetActiveChat,
  className,
}: ISearchUserDialog) => {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const loading = useAppSelector((store) => store.chat.isLoading);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const user = useUser();
  const users = useMemo(
    () =>
      data
        ? data.filter((chat) => {
            if (user) return chat.title[user?.uid] !== "Favorites";
          })
        : null,
    [data, user],
  );
  const { currentChats } = useFetchUsersChat(
    users,
    debouncedSearchValue,
    false,
    setIsLoading,
  );

  const searchInputProps = {
    name: "search",
    placeholder: "Search...",
    value: searchValue,
    setValue: setSearchValue,
    setDebouncedValue: setDebouncedSearchValue,
  };

  const handleSelectChat = async (chat: IChat) => {
    try {
      if (chat.chatType === "none") {
        handleCreateNewChat(chat);
        navigate("/c/" + chat.id);
      } else {
        handleSetActiveChat(chat.id);
        scrollToChatLink(listRef, chat.id);
      }
    } finally {
      setIsOpen(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          className={"outline-none rounded-full"}
          onClick={() => setIsOpen(true)}
        >
          <AddChatButton className={className} />
        </button>
      </DialogTrigger>

      <DialogOverlay className="fixed cursor-auto inset-0 bg-[#000] bg-opacity-80">
        <DialogContent
          className={cn(
            "fixed outline-none top-1/2 left-1/2 transform border-none -translate-x-1/2 sm:w-[450px] -translate-y-1/2 bg-white p-6 rounded-md shadow-lg",
          )}
        >
          <DialogHeader>
            <DialogTitle className="text-[16px]">Search user...</DialogTitle>
          </DialogHeader>
          {loading && (
            <div className="-mt-2 flex justify-center items-center">
              <Loader isDefault />
            </div>
          )}
          <Command
            className={cn(
              "w-full border-none",
              !isLoading && "rounded-lg border shadow-md",
            )}
          >
            <>
              <SearchInput
                autoComplete="off"
                className="py-3 text-[14px] placeholder:text-[14px] bg-lightBlue rounded-b-none"
                {...searchInputProps}
              />

              <CommandList className="max-h-[200px] custom-scrollbar blue-scrollbar">
                {isLoading ? (
                  Array.from({ length: 4 }).map((_, key) => (
                    <SkeletonChatListItem key={key} />
                  ))
                ) : currentChats && currentChats?.length > 0 ? (
                  <CommandGroup>
                    {currentChats.map((chat, index) => (
                      <ChatListItem
                        key={chat.id}
                        {...chat}
                        index={index}
                        isActive={false}
                        setChat={() => handleSelectChat(chat)}
                      />
                    ))}
                  </CommandGroup>
                ) : (
                  <CommandEmpty className="py-4">
                    <NotFound value={searchValue} />
                  </CommandEmpty>
                )}
              </CommandList>
            </>
          </Command>
          <DialogDescription className="hidden" />
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default SearchUserDialog;
