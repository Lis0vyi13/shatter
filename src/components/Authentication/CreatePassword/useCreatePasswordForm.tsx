import { FormEvent, useState } from "react";
import { signUpWithGoogleAndEmail } from "@/firebase/google/googleEmailAuth";

const useCreatePasswordForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await signUpWithGoogleAndEmail({ username, password });
    setIsLoading(false);
  };

  return {
    username,
    isLoading,
    setUsername,
    password,
    setPassword,
    handleSubmit,
  };
};

export default useCreatePasswordForm;
