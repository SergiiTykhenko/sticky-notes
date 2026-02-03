import useAnimateFridge from "./hooks/useAnimateFridge";
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

  const { containerRef, fridgeRef, handleAnimateFridge } = useAnimateFridge();

  return (
    <div className="w-screen h-screen overflow-hidden">
      <div
        ref={containerRef}
        className="relative w-full h-full transform-[scale(0.3)] transition-transform duration-3000 ease-in-out"
      >
        <img
          ref={fridgeRef}
          className="absolute top-0 left-0 max-w-[unset]"
          src="/fridge.png"
          alt="fridge"
          onLoad={handleAnimateFridge}
        />
        <div className="absolute top-0 left-0 w-full h-full" ref={boardRef}>
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
      </div>
    </div>
  );
};

export default Board;
