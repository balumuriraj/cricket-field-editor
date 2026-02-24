import { useState, useEffect, useRef } from "react";

function useElementSize() {
  const ref = useRef<HTMLElement | null>(null);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateSize = () => {
      if (ref.current) {
        setSize({
          width: ref.current.offsetWidth,
          height: ref.current.offsetHeight,
        });
      }
    };

    const resizeObserver = new ResizeObserver(() => updateSize());
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    updateSize();

    return () => {
      if (ref.current) {
        resizeObserver.unobserve(ref.current);
      }
    };
  }, []);

  return [size, ref] as const;
}

export default useElementSize;