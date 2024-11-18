import Image, { ImageProps } from "next/image";

type LogoProps = Omit<ImageProps, "src" | "alt">;

const Logo = (props: LogoProps) => {
  return <Image priority {...props} src="/logo.svg" alt="logo" />;
};

export default Logo;
