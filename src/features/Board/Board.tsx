import AddNoteButton from "./components/AddNoteButton";
import Note from "./components/Note";
import useDragableNotes from "./hooks/useDragableNotes";
import DeleteNoteButton from "./components/DeleteNoteButton";

const Board = () => {
  const {
    notes,
    boardRef,
    isDragging,
    handleRemoveNote,
    handleNoteSave,
    handleAddNote,
  } = useDragableNotes();

  return (
    <>
      <div
        className="relative w-screen h-screen overflow-hidden"
        ref={boardRef}
      >
        {notes.map((note, index) => (
          <Note
            key={note.id}
            note={note}
            onNoteSave={handleNoteSave}
            zIndex={index}
          />
        ))}
      </div>
      <AddNoteButton onClick={handleAddNote} />
      <DeleteNoteButton isDragging={isDragging} onDelete={handleRemoveNote} />
    </>
  );
};

export default Board;
