import { cn, getFormattedBirthday } from "@/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover";
import EditProfileFormItem from "./EditProfileFormItem";
import Input from "@/components/ui/Inputs/Input";
import BirthdayPicker from "@/components/ui/BirthdayPicker";
import CustomPhoneInput from "@/components/ui/CustomPhoneInput";

import { IUser } from "@/types/user";
import useEditProfileForm from "./hooks/useEditProfileForm";
import EditProfileButtons from "./EditProfileButtons";

const inputClassName =
  "text-left transition-all border-none bg-transparent placeholder:text-white text-white outline-separator px-2 py-2 text-[12px] focus:outline-gray";

const EditProfileForm = ({
  onSubmit,
  user,
}: {
  onSubmit: () => void;
  user: IUser | null;
}) => {
  const {
    username,
    handleUsernameChange,
    birthday,
    setBirthday,
    phoneNumber,
    setPhoneNumber,
    name,
    setName,
    handleSubmit,
    isLoading,
  } = useEditProfileForm(onSubmit, user);

  return (
    user && (
      <form onSubmit={handleSubmit} className="mt-3 text-[12px]">
        <ul className="flex flex-col gap-3">
          <input
            type="text"
            className="absolute opacity-0 w-0 h-0 pointer-events-none"
          />
          <EditProfileFormItem name="name">
            <div className="w-[70%]">
              <Input
                className={cn(inputClassName)}
                name={"name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </EditProfileFormItem>
          <EditProfileFormItem name="username">
            <div className="w-[70%]">
              <Input
                className={inputClassName}
                name={"username"}
                value={username}
                placeholder="@username"
                onChange={handleUsernameChange}
              />
            </div>
          </EditProfileFormItem>
          <EditProfileFormItem name="Date of Birth">
            <Popover modal>
              <PopoverTrigger asChild>
                <div className="w-[70%]">
                  <Input
                    className={cn(
                      "cursor-pointer hover:bg-separator",
                      inputClassName,
                    )}
                    name={"birthday"}
                    value={getFormattedBirthday(birthday)}
                    placeholder="Pick a Date"
                    type="button"
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="p-0 bg-dark text-white border-none outline-none">
                <BirthdayPicker value={birthday} onChange={setBirthday} />
              </PopoverContent>
            </Popover>
          </EditProfileFormItem>
          <EditProfileFormItem name="Phone Number">
            <div className="w-[70%]">
              <CustomPhoneInput
                value={phoneNumber}
                onChange={(phone) => setPhoneNumber(phone)}
              />
            </div>
          </EditProfileFormItem>
          <EditProfileButtons isLoading={isLoading} />
        </ul>
      </form>
    )
  );
};

export default EditProfileForm;
