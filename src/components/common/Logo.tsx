import { ImgHTMLAttributes } from "react";

interface ILogo extends ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
}

const Logo = (props: ILogo) => {
  return <img {...props} src="/logo.svg" alt="logo" />;
};

export default Logo;
