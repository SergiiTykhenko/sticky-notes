const POINTER_MOVE_THRESHOLD = 5;

const getIsPointerMoved = (x1: number, y1: number, x2: number, y2: number) => {
  const xDifference = Math.abs(x1 - x2);
  const yDifference = Math.abs(y1 - y2);

  return (
    xDifference > POINTER_MOVE_THRESHOLD || yDifference > POINTER_MOVE_THRESHOLD
  );
};

export default getIsPointerMoved;
