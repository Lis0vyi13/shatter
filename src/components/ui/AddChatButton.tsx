import { cn } from "@/utils";
import { FaPenToSquare } from "react-icons/fa6";

const AddChatButton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "relative transition-all cursor-pointer flex justify-center items-center w-11 h-11 p-2 rounded-xl bg-lightBlue bg-opacity-100 text-[#1c062a] hover:bg-[#9b9bbf]",
        className
      )}
    >
      <FaPenToSquare size={16} />
    </div>
  );
};

export default AddChatButton;
