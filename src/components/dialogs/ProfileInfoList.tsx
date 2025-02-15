import { memo, useEffect, useState } from "react";
import { formatTimestampToDate, getFormattedBirthday } from "@/utils";
import { getUserStatus } from "@/services/user";
import useActions from "@/hooks/useActions";
import { getDateFromTimestamp } from "./EditProfile/hooks/useEditProfileForm";

import ProfileInfoItem from "./ProfileInfoItem";
import { SelectedDate } from "../ui/BirthdayPicker";

import { IUser } from "@/types/user";

const ProfileInfoList = ({ user }: { user: IUser | null }) => {
  const [lastSeenValue, setLastSeenValue] = useState<string>(
    user?.updatedAt as string,
  );
  const { setUser } = useActions();
  const firstSeenValue = user && formatTimestampToDate(user.createdAt);

  useEffect(() => {
    if (!user?.updatedAt) {
      const getStatus = async () => {
        if (user) {
          const status = await getUserStatus(user?.uid);
          if (status) {
            setLastSeenValue(formatTimestampToDate(status.updatedAt));
            setUser({
              ...user,
              updatedAt: formatTimestampToDate(status.updatedAt),
            });
          }
        }
      };

      getStatus();
    }
  }, [setUser, user]);

  return (
    <ul className="flex items-center gap-4">
      <li className="border-r border-separator border-separate pr-4">
        <ProfileInfoItem title="First seen" value={firstSeenValue} />
      </li>
      <li className="border-r border-separator border-separate pr-4">
        <ProfileInfoItem title="Last seen" value={lastSeenValue} />
      </li>
      <li>
        {user?.birthday && (
          <ProfileInfoItem
            title="Date of Birth"
            value={getFormattedBirthday(
              getDateFromTimestamp(user.birthday) as SelectedDate,
            )}
          />
        )}
      </li>
    </ul>
  );
};

export default memo(ProfileInfoList);
