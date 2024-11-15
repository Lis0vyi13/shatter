const ProgressBar = ({ value }: { value: number }) => {
  return (
    <div className="w-full bg-gray bg-opacity-20 h-2 bg-gray-800 rounded-full overflow-hidden">
      <div
        className="h-full transition-all duration-500 rounded-full"
        style={{
          width: `${value}%`,
          backgroundImage: "linear-gradient(90deg, #00ff66, #eaff00)",
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
