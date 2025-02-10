import { useState } from "react";
import { updateUserPassword } from "@/services/auth";
import { User } from "firebase/auth";
import { toast } from "sonner";

export const usePasswordChange = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onPasswordChange = async (
    user: User | null,
    oldPassword: string,
    newPassword: string,
  ) => {
    setLoading(true);
    try {
      await updateUserPassword(user, oldPassword, newPassword);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { onPasswordChange, loading, error };
};
