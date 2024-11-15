import { FormEvent, useState } from "react";
import { doSignInWithEmailAndPassword } from "@/firebase/signIn";
import { toast } from "sonner";

const useLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user = await doSignInWithEmailAndPassword(email, password);
      if (user) {
        if (user.emailVerified) {
          toast.success("You have successfully signed in!");
        } else {
          toast.error("Account verification is required before you can continue.");
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred during sign-in.");
    }
  };
  return { email, setEmail, password, setPassword, handleSubmit };
};

export default useLoginForm;
