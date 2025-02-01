import { ImgHTMLAttributes } from "react";

const Logo = (
  props: Omit<ImgHTMLAttributes<HTMLImageElement>, "alt" | "src">,
) => {
  return <img {...props} src="/logo.svg" alt="Shatter logo" />;
};

export default Logo;
