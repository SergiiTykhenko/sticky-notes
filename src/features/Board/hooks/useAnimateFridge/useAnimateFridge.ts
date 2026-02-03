import { useCallback, useRef, useMemo } from "react";

const FRIDGE_BOARD_AREA_WIDTH = 1000;
const FRIDGE_OFFSET_TOP = 40;
const FRIDGE_OFFSET_LEFT = 150;

const useAnimateFridge = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fridgeRef = useRef<HTMLImageElement>(null);

  const handleAnimateFridge = useCallback(() => {
    window.requestAnimationFrame(() => {
      const { offsetWidth } = document.documentElement;

      if (fridgeRef.current && containerRef.current) {
        const scale = offsetWidth / FRIDGE_BOARD_AREA_WIDTH;

        containerRef.current.style.transform = `scale(1)`;
        Object.assign(fridgeRef.current.style, {
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          top: `-${FRIDGE_OFFSET_TOP * scale}px`,
          left: `-${FRIDGE_OFFSET_LEFT * scale}px`,
        });
      }
    });
  }, []);

  return useMemo(
    () => ({ containerRef, fridgeRef, handleAnimateFridge }),
    [handleAnimateFridge]
  );
};

export default useAnimateFridge;
