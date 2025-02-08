import { ReactNode } from "react";
import { DialogClose, DialogContent, DialogTitle } from "../ui/shadcn/dialog";
import { Badge } from "../ui/shadcn/badge";

import { cn, getLanguage } from "@/utils";

import Avatar from "@/components/common/Avatar";
import EditOverlay from "../ui/EditOverlay";
import Banner from "../ui/Banner";
import Icon from "../ui/Icon";
import ProfileInfoList from "./ProfileInfoList";

import { X } from "lucide-react";

import { IUser } from "@/types/user";
import Button from "../ui/Buttons/Button";

const Profile = ({
  user,
  children,
}: {
  user: IUser | null;
  children?: ReactNode;
}) => {
  return (
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
        <div className="mt-5 border-b border-separator pb-4">
          <ProfileInfoList user={user} />
        </div>

        {children}

        <section className="flex justify-end mt-4 text-[12px]">
          <div className="flex gap-2 w-fit">
            <button className="pointer-events-none" />
            <DialogClose asChild>
              <div>
                <Button className="border-separator hover:bg-separator text-white border rounded-md px-3 whitespace-nowrap">
                  Cancel
                </Button>
              </div>
            </DialogClose>
            <Button className="border-separator border rounded-md px-3 whitespace-nowrap bg-blue hover:bg-[#6f64c7]">
              Save changes
            </Button>
          </div>
        </section>
      </div>

      <DialogClose className="rounded-full flex items-center justify-center absolute z-20 right-2 top-2">
        <Icon isDark className="inline-flex text-white py-1 px-1">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Icon>
      </DialogClose>
    </DialogContent>
  );
};

export default Profile;
