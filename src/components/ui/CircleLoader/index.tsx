import styles from "./CircleLoader.module.css";

const CircleLoader = ({ className }: { className?: string }) => {
  return <div className={`${styles.loader} ${className}`} />;
};

export default CircleLoader;
