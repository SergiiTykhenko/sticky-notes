import {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useEffectEvent,
} from "react";
import { NOTE_WIDTH, NOTE_HEIGHT, type NoteType } from "../../components/Note";
import createNewNoteId from "./helpers/createNewNoteId";

const getNoteElement = (
  element: EventTarget | HTMLElement | null,
): HTMLDivElement | null => {
  if (!element || !(element instanceof HTMLElement)) return null;

  if (element.dataset.type === "note" && element instanceof HTMLDivElement) {
    return element;
  }

  return element.parentElement ? getNoteElement(element.parentElement) : null;
};

interface PointerOffset {
  x: number;
  y: number;
}

const useDragableNotes = () => {
  const [notes, setNotes] = useState<NoteType[]>(
    JSON.parse(localStorage.getItem("notes") || "[]"),
  );
  const [draggedNoteId, setDraggedNoteId] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const saveNotePositionEvent = useEffectEvent(
    (e: PointerEvent, pointerOffset: PointerOffset) => {
      const newNotes = notes.map((note) =>
        note.id === draggedNoteId
          ? {
              ...note,
              x: e.clientX - pointerOffset.x,
              y: e.clientY - pointerOffset.y,
            }
          : note,
      );

      setNotes(newNotes);
      localStorage.setItem("notes", JSON.stringify(newNotes));
    },
  );

  const saveNoteAsLastInNotesEvent = useEffectEvent((noteId: number) => {
    const note = notes.find((note) => note.id === noteId);

    if (!note) return notes;

    const filteredNotes = notes.filter((note) => note.id !== noteId);
    const newNotes = [...filteredNotes, note];

    setNotes(newNotes);
    localStorage.setItem("notes", JSON.stringify(newNotes));
  });

  useEffect(() => {
    const container = ref.current;
    const pointerOffset: PointerOffset = { x: 0, y: 0 };
    let draggedNoteId: number | null = null;

    const handlePointerMove = (e: PointerEvent) => {
      window.requestAnimationFrame(() => {
        let noteElement: HTMLDivElement | null = null;

        if (draggedNoteId === null) {
          const noteElement = getNoteElement(e.target);

          if (!noteElement) return;

          draggedNoteId = Number(noteElement.dataset.id);
          setDraggedNoteId(draggedNoteId);
        } else {
          noteElement =
            ref.current?.querySelector(`[data-id="${draggedNoteId}"]`) ?? null;
        }

        if (!noteElement) return;

        const { clientX, clientY } = e;

        noteElement.style.transform = `translate(${clientX - pointerOffset.x}px, ${clientY - pointerOffset.y}px)`;
      });
    };

    const handlePointerUp = (e: PointerEvent) => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);

      if (draggedNoteId === null) return;

      saveNotePositionEvent(e, pointerOffset);

      setDraggedNoteId(null);
      draggedNoteId = null;
    };

    const handlePointerDown = (e: PointerEvent) => {
      const noteElement = getNoteElement(e.target);
      draggedNoteId = null;
      setDraggedNoteId(null);

      if (!noteElement) return;

      const { dataset } = noteElement;

      const noteId = Number(dataset.id);
      pointerOffset.x = e.clientX - Number(dataset.x);
      pointerOffset.y = e.clientY - Number(dataset.y);

      saveNoteAsLastInNotesEvent(noteId);

      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", handlePointerUp);
    };

    container?.addEventListener("pointerdown", handlePointerDown);

    return () => {
      container?.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  const handleNoteSave = useCallback((editedNote: NoteType) => {
    setNotes((notes) => {
      const newNotes = notes.map((note) =>
        note.id === editedNote.id ? editedNote : note,
      );
      localStorage.setItem("notes", JSON.stringify(newNotes));

      return newNotes;
    });
  }, []);

  const handleAddNote = useCallback(() => {
    const { offsetHeight, offsetWidth } = document.documentElement;

    setNotes((notes) => {
      const newNote: NoteType = {
        id: createNewNoteId(notes),
        content: "",
        x: offsetWidth / 2 - NOTE_WIDTH / 2,
        y: offsetHeight / 2 - NOTE_HEIGHT / 2,
      };

      const newNotes = [...notes, newNote];
      localStorage.setItem("notes", JSON.stringify(newNotes));

      return newNotes;
    });
  }, []);

  const handleRemoveNote = useCallback(() => {
    if (!draggedNoteId) return;

    setNotes((notes) => {
      const newNotes = notes.filter((note) => note.id !== draggedNoteId);
      localStorage.setItem("notes", JSON.stringify(newNotes));

      return newNotes;
    });
  }, [draggedNoteId]);

  return useMemo(
    () => ({
      notes,
      isDragging: draggedNoteId !== null,
      boardRef: ref,
      handleNoteSave,
      handleAddNote,
      handleRemoveNote,
    }),
    [
      notes,
      draggedNoteId,
      handleNoteSave,
      handleAddNote,
      handleRemoveNote,
      ref,
    ],
  );
};

export default useDragableNotes;
