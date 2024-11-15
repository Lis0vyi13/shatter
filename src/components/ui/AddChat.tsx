import { FaPen } from "react-icons/fa";

const AddChat = () => {
  return (
    <div className="relative cursor-pointer flex justify-center items-center w-11 h-11 p-2 rounded-full bg-dark text-white transition-all hover:bg-[#444444]">
      <FaPen size={18} />
    </div>
  );
};

export default AddChat;
