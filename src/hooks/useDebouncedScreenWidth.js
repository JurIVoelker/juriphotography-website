import { useEffect, useState, useRef } from "react";
import { useDebounce } from "use-debounce";

function useDebouncedScreenWidth(ref, debounceDelay = 100) {
  const [currentWidth, setCurrentWidth] = useState(0);
  const debouncedWidth = useDebounce(currentWidth, debounceDelay);

  useEffect(() => {
    function handleResize() {
      if (ref?.current) {
        setCurrentWidth(ref.current.clientWidth);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [ref]);

  const isMounted = !!(
    ref?.current?.clientWidth &&
    debouncedWidth &&
    debouncedWidth[0]
  );
  return {
    elementWidth: debouncedWidth.length ? debouncedWidth[0] : 0,
    isMounted: ref?.current?.clientWidth !== undefined,
  };
}

export default useDebouncedScreenWidth;
