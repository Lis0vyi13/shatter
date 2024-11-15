import { ImgHTMLAttributes } from "react";

const Logo = (props: ImgHTMLAttributes<HTMLImageElement>) => {
  return <img {...props} src="/logo.svg" alt="logo" />;
};

export default Logo;
