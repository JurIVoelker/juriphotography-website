import { useEffect, useState, useRef } from "react";
import { useDebounce } from "use-debounce";

function useDebouncedScreenWidth(debounceDelay = 1000) {
  const [currentWidth, setCurrentWidth] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth;
    }
    return 0; // Default width for the server-side render
  });
  const [isResizing, setResizing] = useState(false);
  const debouncedWidth = useDebounce(currentWidth, debounceDelay);
  const resizeTimeoutRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      setResizing(true);
      resizeTimeoutRef.current = setTimeout(() => {
        setResizing(false);
      }, debounceDelay);

      setCurrentWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Set the initial width on client side only
    setCurrentWidth(window.innerWidth);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [debounceDelay]);

  return { windowWidth: debouncedWidth[0], isWindowResizing: isResizing };
}

export default useDebouncedScreenWidth;
