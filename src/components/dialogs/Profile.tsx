import { ReactNode, useState } from "react";
import { DialogClose, DialogContent, DialogTitle } from "../ui/shadcn/dialog";
import { Badge } from "../ui/shadcn/badge";

import { cn, getLanguage } from "@/utils";

import Avatar from "@/components/common/Avatar";
import EditOverlay from "../ui/EditOverlay";
import Banner from "../ui/Banner";
import Icon from "../ui/Icon";
import ProfileInfoList from "./ProfileInfoList";
import Button from "../ui/Buttons/Button";

import { X, Loader2 } from "lucide-react";
import { IUser } from "@/types/user";
import { updateUser, uploadImage } from "@/services/user";

const buttonClassName =
  "text-[11px] py-[2px] px-3 rounded-md border border-separator inline-flex items-center";

const Profile = ({
  user,
  isUploading,
  setIsUploading,
  children,
}: {
  user: IUser | null;
  isUploading: boolean;
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
  children?: ReactNode;
}) => {
  const [uploadingType, setUploadingType] = useState<
    "avatar" | "banner" | null
  >(null);
  const [avatarUrl, setAvatarUrl] = useState(user?.photoUrl || "");
  const [bannerUrl, setBannerUrl] = useState(user?.banner || "");

  const handleUpload = async (file: File, type: "avatar" | "banner") => {
    if (!user) return;
    setIsUploading(true);
    setUploadingType(type);
    try {
      const url = await uploadImage(file, user.uid, type);
      await updateUser(user.uid, {
        [type === "avatar" ? "photoUrl" : "banner"]: url,
      });
      if (type === "avatar") setAvatarUrl(url);
      else setBannerUrl(url);
    } catch (e) {
      console.error("Upload failed:", e);
    } finally {
      setIsUploading(false);
      setUploadingType(null);
    }
  };

  return (
    <DialogContent
      className={cn(
        "text-white bg-[#0d0e12] py-1 pb-3 px-1 outline-none border-none overflow-hidden",
      )}
    >
      <div className="h-[115px] rounded-t-sm rounded-b-2xl overflow-hidden relative">
        <EditOverlay
          loading={isUploading}
          onUpload={(file) => handleUpload(file, "banner")}
        >
          <Banner src={bannerUrl} />
          {isUploading && uploadingType === "banner" && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Loader2 className="animate-spin w-5 h-5 text-white" />
            </div>
          )}
        </EditOverlay>
      </div>

      <div className="relative px-4">
        <div className="flex w-full gap-2 justify-between -mt-12">
          <EditOverlay
            onUpload={(file) => handleUpload(file, "avatar")}
            isRounded
            className="w-16 h-16 relative"
          >
            <Avatar
              className="text-[24px] border-[3px] border-[#0d0e12]"
              src={avatarUrl}
              title={user?.displayName || ""}
            />
            {isUploading && uploadingType === "avatar" && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10 rounded-full">
                <Loader2 className="animate-spin w-4 h-4 text-white" />
              </div>
            )}
          </EditOverlay>

          <div className="mt-10">
            <Button
              className={cn(buttonClassName, "hover:bg-separator")}
              disabled={isUploading}
            >
              <div className="inline-flex items-center gap-1">
                <span className="leading-7">Change Password</span>
              </div>
            </Button>
          </div>
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
