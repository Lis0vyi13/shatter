import Button from "@/components/ui/Buttons/Button";
import { DialogClose } from "@/components/ui/shadcn/dialog";

const EditProfileButtons = ({ isLoading }: { isLoading?: boolean }) => {
  return (
    <section className="flex justify-end text-[12px]">
      <div className="flex gap-2 w-fit h-8">
        <button className="pointer-events-none" />
        <DialogClose asChild>
          <div>
            <Button
              type="button"
              className="border-separator hover:bg-separator text-white border rounded-md px-3 whitespace-nowrap"
            >
              Cancel
            </Button>
          </div>
        </DialogClose>
        <div className="w-[110px]">
          <Button
            isLoading={isLoading}
            className="border-separator border rounded-md px-3 whitespace-nowrap bg-blue hover:bg-[#6f64c7] text-center"
          >
            Save changes
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EditProfileButtons;
