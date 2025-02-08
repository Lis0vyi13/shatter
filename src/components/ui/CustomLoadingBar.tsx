import { useEffect, useRef } from "react";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";

const CustomLoadingBar = () => {
  const loadingBarRef = useRef<LoadingBarRef>(null);

  useEffect(() => {
    loadingBarRef.current?.continuousStart();
    const timer = setTimeout(() => {
      loadingBarRef.current?.complete();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return <LoadingBar color="#7678ed" height={2} shadow ref={loadingBarRef} />;
};

export default CustomLoadingBar;
