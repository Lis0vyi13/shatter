import { ReactNode } from "react";
import { InputProps } from "@/components/ui/Inputs/Input";
import { cn } from "@/utils";

interface IEditProfileFormItem extends InputProps {
  name: string;
  className?: string;
  children: ReactNode;
}

const EditProfileFormItem = ({
  name,
  className,
  children,
}: IEditProfileFormItem) => {
  return (
    <li
      className={cn(
        `relative flex justify-between gap-3 border-b pb-3 border-separator`,
        className,
      )}
    >
      <span className="capitalize text-[11px]">{name}</span>
      {children}
    </li>
  );
};

export default EditProfileFormItem;
