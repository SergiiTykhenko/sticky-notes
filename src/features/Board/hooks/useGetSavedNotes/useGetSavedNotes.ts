import { type NoteType } from "../../components/Note";

const initialNote: NoteType = {
  id: 1,
  content:
    "This is your first note. Press + to add a new note. Drag and drop on trash icon to delete.",
  x: 600,
  y: 300,
};

const useGetSavedNotes = () => {
  const savedNotes = localStorage.getItem("notes");

  return savedNotes ? JSON.parse(savedNotes) : [initialNote];
};

export default useGetSavedNotes;
