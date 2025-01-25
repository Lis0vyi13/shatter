import { cn } from "@/utils";
import { FaPen } from "react-icons/fa";

const AddChatButton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "relative cursor-pointer flex justify-center items-center w-11 h-11 p-2 rounded-full bg-dark text-white transition-all hover:bg-[#444444]",
        className
      )}
    >
      <FaPen size={14} />
    </div>
  );
};

export default AddChatButton;
