interface AddNoteButtonProps {
  onClick: () => void;
}

export const AddNoteButton: React.FC<AddNoteButtonProps> = ({ onClick }) => (
  <button
    className="bg-blue-500 text-white rounded-full w-10 h-10 absolute bottom-3 right-3 cursor-pointer text-3xl pb-[3px]"
    onClick={onClick}
  >
    +
  </button>
);

export default AddNoteButton;
