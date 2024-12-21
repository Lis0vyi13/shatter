import { FormEvent, useState } from "react";
import { doSignInWithEmailAndPassword } from "@/firebase/signIn";
import { toast } from "sonner";

const useLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await doSignInWithEmailAndPassword(email, password);
      if (user) {
        if (user.emailVerified) {
          toast.success("You have successfully logged in!");
        } else {
          toast.error(
            "Account verification is required before you can continue."
          );
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred during sign-in.");
      }
    }
  };
  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    isLoading,
    setIsLoading,
  };
};

export default useLoginForm;
