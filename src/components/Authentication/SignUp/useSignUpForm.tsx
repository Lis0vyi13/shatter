import doCreateUserWithEmailAndPassword from "@/firebase/auth";
import { FormEvent, useState } from "react";

const useSignUpForm = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [progressValue, setProgressValue] = useState<number>(0);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsSubmitted(true);
      await doCreateUserWithEmailAndPassword(
        email,
        password,
        username,
        setProgressValue,
        setIsSubmitted,
      );
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setTimeout(() => {
        setIsSubmitted(false);
        setProgressValue(0);
      }, 600);
    }
  };

  return {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    isSubmitted,
    progressValue,
    handleSubmit,
  };
};

export default useSignUpForm;
