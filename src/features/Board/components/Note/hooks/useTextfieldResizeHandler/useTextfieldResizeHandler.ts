import { useCallback, useLayoutEffect, useMemo, type RefObject } from "react";

const useTextfieldResizeHandler = (noteRef: RefObject<HTMLDivElement>) => {
  const resize = useCallback(() => {
    const textareaRef = noteRef.current?.querySelector("textarea");

    if (!textareaRef) return;

    textareaRef.style.height = "auto";
    textareaRef.style.height = textareaRef.scrollHeight + "px";
  }, [noteRef]);

  useLayoutEffect(resize, [resize]);

  return useMemo(() => ({ resize }), [resize]);
};

export default useTextfieldResizeHandler;
