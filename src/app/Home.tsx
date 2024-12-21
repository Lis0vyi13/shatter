"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import useAuth from "@/hooks/useAuth";

import Button from "@/components/ui/Button";
import Title from "@/components/ui/Title";

const Home = () => {
  const { replace } = useRouter();
  const isLogin = useAuth();

  useEffect(() => {
    if (isLogin) {
      replace("/c");
    }
  }, [isLogin, replace]);

  return (
    <>
      <motion.header
        className="py-4 flex justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Link href={"/"}>
          <Image width={30} height={30} src="/logo.svg" alt="Shatter" />
        </Link>
        <Link className="rounded-xl" href="/login">
          <Button className="w-full text-[14px] border-2 rounded-xl hover:bg-blue">
            Login / Signup
          </Button>
        </Link>
      </motion.header>
      <motion.main
        className="mt-40 flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Title className="text-center text-5xl">
          Connect with your mate easily
        </Title>
        <motion.h2
          className="text-center mt-12 max-w-[700px] leading-6 font-[300]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Shatter is a communication application between friends, family and
          learn at the same time wrapped in one user-friendly application
        </motion.h2>
        <motion.div
          className="buttons mt-8 mb-4 text-[14px] flex items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Link className="rounded-xl w-[150px]" href="/sign-up">
            <Button className="w-full border-2 rounded-xl py-3 bg-blue hover:bg-opacity-40">
              Get started
            </Button>
          </Link>
        </motion.div>
      </motion.main>
    </>
  );
};

export default Home;
