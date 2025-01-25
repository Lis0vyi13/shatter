import { FaGoogle } from "react-icons/fa";
import { AuthInputProps } from "@/components/ui/Inputs/AuthInput";

export const AUTH_SERVICES = [
  {
    title: "Google",
    Icon: <FaGoogle />,
  },
];

export const authInputClassName =
  "bg-dark pl-3 py-3 text-white text-[12px] placeholder:text-[12px] placeholder:text-white placeholder:text-opacity-30 outline outline-gray/45 focus:outline-white/55";

export const CREATE_PASSWORD_INPUTS: AuthInputProps[] = [
  {
    name: "username",
    placeholder: "Username",
    required: true,
    isDark: true,
    autoComplete: "name",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    minLength: 6,
    required: true,
    autoComplete: "new-password",
  },
];

export const LOGIN_PASSWORD_INPUTS: AuthInputProps[] = [
  {
    name: "email",
    type: "email",
    placeholder: "Email",
    required: true,
    isDark: true,
    autoComplete: "email",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    minLength: 6,
    required: true,
    autoComplete: "current-password",
  },
];

export const SIGNUP_PASSWORD_INPUTS: AuthInputProps[] = [
  {
    name: "username",
    placeholder: "Username",
    required: true,
    isDark: true,
    autoComplete: "name",
  },
  {
    name: "email",
    type: "email",
    placeholder: "Email",
    required: true,
    isDark: true,
    autoComplete: "email",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    minLength: 6,
    required: true,
    autoComplete: "new-password",
  },
];
