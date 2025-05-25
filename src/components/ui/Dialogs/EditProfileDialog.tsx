import { ReactNode, useState } from "react";

import {
  Dialog,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "../shadcn/dialog";

import useUser from "@/hooks/useUser";

import Profile from "../../dialogs/Profile";
import EditProfileForm from "@/components/dialogs/EditProfile/EditProfileForm";

const EditProfileDialog = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useUser();
  const [isUploading, setIsUploading] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger autoFocus={false} asChild>
        <div onClick={() => setIsOpen(true)}>{children}</div>
      </DialogTrigger>

      <DialogOverlay className="opacity-10">
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>

        <Profile
          isUploading={isUploading}
          setIsUploading={setIsUploading}
          user={user}
        >
          <EditProfileForm
            loading={isUploading}
            onSubmit={() => setIsOpen(false)}
            user={user}
          />

          {/* <section className="flex justify-end mt-4 text-[12px]">
            <div className="flex gap-2 w-fit">
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
          </section> */}
        </Profile>
      </DialogOverlay>
    </Dialog>
  );
};

export default EditProfileDialog;
