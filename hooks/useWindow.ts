import { IWindow } from "@/interface";
import { useEffect, useState } from "react";
/** returns info about window */
export default function useWindow(): IWindow {
  const [screenSize, setScreenSize] = useState<{ width: number; height: number }>({
    width: 300,
    height: 300,
  });

  useEffect(() => {
    setScreenSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  return { width: screenSize?.width, height: screenSize?.height };
}
