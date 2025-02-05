import { ReactNode, useState } from "react";
// import useUser from "@/hooks/useUser";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "../shadcn/dialog";

import Icon from "../Icon";

import { X } from "lucide-react";

const EditProfileDialog = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const user = useUser();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div onClick={() => setIsOpen(true)}>{children}</div>
      </DialogTrigger>

      <DialogOverlay className="bg-[#000] opacity-60">
        <DialogContent className="text-white bg-[#0d0e12] py-1 pb-3 px-1 outline-none border-none">
          <section className="content">
            <img
              className="w-full object-cover"
              src={"/banner.png"}
              alt="user banner"
            />
            <DialogHeader>
              <DialogTitle className="text-[16px]">Search user...</DialogTitle>
              <DialogTitle className="text-[16px]">Search user...</DialogTitle>
              <DialogTitle className="text-[16px]">Search user...</DialogTitle>
              <DialogTitle className="text-[16px]">Search user...</DialogTitle>
              <DialogTitle className="text-[16px]">Search user...</DialogTitle>
              <DialogTitle className="text-[16px]">Search user...</DialogTitle>
              <DialogTitle className="text-[16px]">Search user...</DialogTitle>
              <DialogTitle className="text-[16px]">Search user...</DialogTitle>
            </DialogHeader>
          </section>

          <DialogClose className="rounded-full flex items-center justify-center absolute right-2 top-2">
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
