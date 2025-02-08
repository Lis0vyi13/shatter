const Banner = ({ src }: { src: string }) => {
  return (
    <div className="w-full h-full">
      <img
        className="w-full h-full object-cover object-center"
        src={src || "/banner.png"}
        alt="user banner"
      />
    </div>
  );
};

export default Banner;
