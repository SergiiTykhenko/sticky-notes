import useNoteEditListeners from "./hooks/useNoteEditListeners";
import useTextfieldResizeHandler from "./hooks/useTextfieldResizeHandler";

export interface NoteType {
  id: number;
  content: string;
  x: number;
  y: number;
}

export interface NoteProps {
  note: NoteType;
  zIndex: number;
  onNoteSave: (note: NoteType) => void;
}

export const NOTE_WIDTH = 256;
export const NOTE_HEIGHT = 256;

const Note: React.FC<NoteProps> = ({ note, zIndex, onNoteSave }) => {
  const { id, content, x, y } = note;
  const {
    noteRef,
    textareaRef,
    isEditing,
    handlePointerDown,
    handlePointerUp,
  } = useNoteEditListeners();

  const { resize } = useTextfieldResizeHandler(noteRef);

  return (
    <div
      data-id={id}
      data-x={x}
      data-y={y}
      data-type="note"
      ref={noteRef}
      className={`absolute cursor-grab flex items-center bg-yellow-500 ${isEditing ? "shadow-2xl" : "shadow-lg"}`}
      style={{
        transform: `translate(${x}px, ${y}px)`,
        zIndex,
        width: NOTE_WIDTH,
        height: NOTE_HEIGHT,
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <textarea
        ref={textareaRef}
        className={`p-2 text-md text-gray-500 w-full h-full resize-none outline-none ${isEditing ? "cursor-text" : "cursor-grab"}`}
        name="content"
        value={content}
        onInput={resize}
        onChange={(e) => onNoteSave({ ...note, content: e.target.value })}
        readOnly={true}
      />
    </div>
  );
};

export default Note;
