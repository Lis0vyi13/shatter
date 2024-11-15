import { FormEvent, useState } from "react";
import { signUpWithGoogleAndEmail } from "@/firebase/google/googleEmailAuth";

const useCreatePasswordForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signUpWithGoogleAndEmail({ username, password });
  };

  return { username, setUsername, password, setPassword, handleSubmit };
};

export default useCreatePasswordForm;
