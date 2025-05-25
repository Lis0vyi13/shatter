import { ReactNode, useId, useState } from "react";
import { cn } from "@/utils";
import { Edit } from "lucide-react";

interface IEditOverlay {
  onUpload?: (file: File) => void;
  children: ReactNode;
  className?: string;
  isRounded?: boolean;
  loading?: boolean;
}

const EditOverlay = ({
  onUpload,
  children,
  className,
  isRounded,
  loading,
}: IEditOverlay) => {
  const [isHover, setIsHover] = useState(false);
  const inputId = useId();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpload) {
      onUpload(file);
    }
  };

  return (
    <div
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={cn(
        "relative overflow-hidden w-full h-full",
        isRounded && "rounded-full",
        className,
      )}
    >
      <div
        className={cn(
          "transition-all absolute inset-0 bg-[#000]",
          isRounded && "rounded-full",
          isHover ? "bg-opacity-60" : "bg-opacity-0",
        )}
      />
      <label
        htmlFor={inputId}
        className={cn(
          "absolute cursor-pointer inset-0 z-10",
          isRounded && "rounded-full",
        )}
      >
        <input
          id={inputId}
          className="hidden"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>
      {children}
      {!loading && (
        <Edit
          size={22}
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all",
            isHover ? "opacity-100" : "opacity-0",
          )}
        />
      )}
    </div>
  );
};

export default EditOverlay;
