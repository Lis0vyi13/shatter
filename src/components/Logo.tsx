import Image, { ImageProps } from "next/image";

const Logo = (props: ImageProps) => {
  return <Image {...props} src="/logo.svg" alt="logo" />;
};

export default Logo;
