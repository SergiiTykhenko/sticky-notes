import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import getIsPointerMoved from "./helpers/getIsPointerMoved";

const useNoteEditListeners = () => {
  const noteRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const pointerPositionRef = useRef({ x: 0, y: 0 });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isEditing) return;

    const handleClickOutside = (e: PointerEvent) => {
      if (
        noteRef.current &&
        textareaRef.current &&
        !noteRef.current.contains(e.target as Node)
      ) {
        textareaRef.current.readOnly = true;
        textareaRef.current.blur();
        setIsEditing(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [isEditing]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (isEditing) return;

      pointerPositionRef.current.x = e.clientX;
      pointerPositionRef.current.y = e.clientY;
    },
    [isEditing],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (isEditing) return;

      const hasPointerMoved = getIsPointerMoved(
        pointerPositionRef.current.x,
        pointerPositionRef.current.y,
        e.clientX,
        e.clientY,
      );

      if (!hasPointerMoved && textareaRef.current) {
        textareaRef.current.readOnly = false;
        textareaRef.current.focus();
        setIsEditing(true);
      }
    },
    [isEditing],
  );

  return useMemo(
    () => ({
      isEditing,
      noteRef,
      textareaRef,
      handlePointerDown,
      handlePointerUp,
    }),
    [noteRef, textareaRef, isEditing, handlePointerDown, handlePointerUp],
  );
};

export default useNoteEditListeners;
