import { memo, useEffect, useState } from "react";
import { formatTimestampToDate } from "@/utils";
import { getUserStatus } from "@/services/user";
import useActions from "@/hooks/useActions";

import ProfileInfoItem from "./ProfileInfoItem";

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
        <ProfileInfoItem title="Date of Birth" value={"16 March, 2004"} />
      </li>
    </ul>
  );
};

export default memo(ProfileInfoList);
