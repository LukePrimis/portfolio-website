import { useState, useEffect } from "react";

const getWindowDimensions = () => {
  if (typeof window !== "undefined") {
    const { innerWidth: width, innerWidth: height } = window;
    return {
      width,
      height,
    };
  } else {
    const width = 9999;
    const height = 9999;
    return {
      width,
      height,
    };
  }
};

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 9999,
    height: 9999,
  });

  useEffect(() => {
    setWindowDimensions(getWindowDimensions());
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

export default useWindowDimensions;

// shoutout: https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs
