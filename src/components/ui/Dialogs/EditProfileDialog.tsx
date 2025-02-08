import { ReactNode, useState } from "react";

import {
  Dialog,
  DialogDescription,
  DialogOverlay,
  DialogTrigger,
} from "../shadcn/dialog";

import useUser from "@/hooks/useUser";

import Profile from "../../dialogs/Profile";

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
        <Profile user={user} />
      </DialogOverlay>
    </Dialog>
  );
};

export default EditProfileDialog;
