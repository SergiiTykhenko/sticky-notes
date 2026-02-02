import type { NoteType } from "../../../../components/Note/Note";

const createNewNoteId = (notes: NoteType[]) => {
  const biggestId = notes.reduce((max, note) => Math.max(max, note.id), 0);

  return biggestId + 1;
};

export default createNewNoteId;
