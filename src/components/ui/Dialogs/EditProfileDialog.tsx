import { ReactNode, useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "../shadcn/dialog";

import useUser from "@/hooks/useUser";
import { cn, getLanguage } from "@/utils";

import Icon from "../Icon";
import Banner from "../Banner";
import EditOverlay from "../EditOverlay";
import Avatar from "@/components/common/Avatar";
import { Badge } from "../badge";

import { X } from "lucide-react";

const EditProfileDialog = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useUser();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div onClick={() => setIsOpen(true)}>{children}</div>
      </DialogTrigger>

      <DialogOverlay className="bg-[#000] opacity-60">
        <DialogDescription></DialogDescription>
        <DialogContent
          className={cn(
            "text-white bg-[#0d0e12] py-1 pb-3 px-1 outline-none border-none overflow-hidden",
          )}
        >
          <div className="h-[115px] rounded-t-sm rounded-b-2xl overflow-hidden">
            <EditOverlay>
              <Banner src={user?.banner || ""} />
            </EditOverlay>
          </div>

          <div className="relative px-4">
            <div className="-mt-12 w-fit relative z-30">
              <EditOverlay isRounded className="w-16 h-16">
                <Avatar
                  className="text-[24px] border-[3px] border-[#0d0e12]"
                  src={user?.photoUrl || ""}
                  title={user?.displayName || ""}
                />
              </EditOverlay>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <DialogTitle
                lang={getLanguage(user?.displayName || "")}
                className="font-[500]"
              >
                {user?.displayName}
              </DialogTitle>
              <Badge className="gap-1 pointer-events-none text-[10px] py-1">
                <span className="text-[7px] mt-[1px]">🟢</span> Online
              </Badge>
            </div>

            <span className="mt-1 text-gray text-[11px]">{user?.email}</span>
          </div>

          <DialogClose className="rounded-full flex items-center justify-center absolute z-20 right-2 top-2">
            <Icon isDark className="inline-flex text-white py-1 px-1">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Icon>
          </DialogClose>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default EditProfileDialog;
