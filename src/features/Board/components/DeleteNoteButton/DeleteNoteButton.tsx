import DeleteIcon from "@/icons/DeleteIcon";
import { useState } from "react";

interface DeleteNoteButtonProps {
  isDragging: boolean;
  onDelete: () => void;
}

export const DeleteNoteButton: React.FC<DeleteNoteButtonProps> = ({
  isDragging,
  onDelete,
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={`absolute bottom-3 left-3 w-10 h-10 z-1000000 ${isDragging ? "cursor-grab" : ""}`}
      onPointerUp={onDelete}
      onPointerEnter={() => isDragging && !isActive && setIsActive(true)}
      onPointerLeave={() => isActive && setIsActive(false)}
    >
      <DeleteIcon
        className={`${isActive ? "fill-red-500" : "fill-gray-500"}`}
      />
    </div>
  );
};

export default DeleteNoteButton;
