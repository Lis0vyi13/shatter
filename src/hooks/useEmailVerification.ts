"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { auth } from "@/firebase/firebaseConfig";
import { applyActionCode } from "firebase/auth";
import { toast } from "sonner";

const useEmailVerification = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const mode = searchParams?.get("mode");
    const actionCode = searchParams?.get("oobCode");

    if (mode === "verifyEmail" && actionCode) {
      applyActionCode(auth, actionCode)
        .then(() => {
          toast.success("Email successfully confirmed!");
        })
        .catch((error) => {
          console.error("Error verifying email:", error);
          toast.error(`Error verifying email: ${error}`);
        });
    }
  }, [searchParams, router]);
};

export default useEmailVerification;
