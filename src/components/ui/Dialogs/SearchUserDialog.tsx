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

import { cn } from "@/utils";
import useUser from "@/hooks/useUser";

import AddChatButton from "../AddChatButton";
import SearchInput from "../Inputs/SearchInput";
import useFetchUsersChat from "@/components/pages/Chat/ChatList/hooks/useFetchUsersChat";
import ChatListItem from "@/components/pages/Chat/ChatList/ChatListItem";
import Loader from "../Loader";

import { IChat } from "@/types/chat";
import { useNavigate } from "react-router-dom";

interface ISearchUserDialog {
  data: IChat[] | null;
  createChat: (chatData: IChat) => Promise<void>;
  setActiveChat: (id: string) => void;
  className?: string;
}

const SearchUserDialog = ({
  data,
  createChat,
  setActiveChat,
  className,
}: ISearchUserDialog) => {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = useUser();
  const users = useMemo(
    () =>
      data
        ? data.filter((chat) => {
            if (user) return chat.title[user?.uid] !== "Favorites";
          })
        : null,
    [data, user]
  );
  const { currentChats } = useFetchUsersChat(users, debouncedSearchValue);

  const searchInputProps = {
    name: "search",
    placeholder: "Search...",
    value: searchValue,
    setValue: setSearchValue,
    setDebouncedValue: setDebouncedSearchValue,
  };

  const handleSelectChat = async (chat: IChat) => {
    setIsLoading(true);
    try {
      if (chat.chatType === "none") {
        await createChat(chat);
        navigate("/c/" + chat.id);
      } else {
        await setActiveChat(chat.id);
      }
    } finally {
      setIsOpen(false);
      setIsLoading(false);
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
            "fixed outline-none top-1/2 left-1/2 transform border-none -translate-x-1/2 sm:w-[450px] -translate-y-1/2 bg-white p-6 rounded-md shadow-lg"
          )}
        >
          <DialogHeader>
            <DialogTitle className="text-[16px]">Search user...</DialogTitle>
          </DialogHeader>
          {isLoading && (
            <div className="-mt-2 flex justify-center items-center">
              <Loader isDefault />
            </div>
          )}
          <Command
            className={cn(
              "w-full border-none",
              !isLoading && "rounded-lg border shadow-md"
            )}
          >
            {!isLoading && (
              <>
                <SearchInput
                  autoComplete="off"
                  className="py-3 text-[14px] placeholder:text-[14px] bg-white rounded-b-none"
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
                          isActive={false}
                          setChat={() => handleSelectChat(chat)}
                        />
                      ))}
                    </CommandGroup>
                  ) : (
                    <CommandEmpty>No results found.</CommandEmpty>
                  )}
                </CommandList>
              </>
            )}
          </Command>
          <DialogDescription className="hidden" />
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default SearchUserDialog;
