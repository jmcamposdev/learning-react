export function Square ({children, isSelected, updateBoard, index}) {
  const squareClassName = `square ${isSelected ? 'is-selected' : ''}`;
  function handleClick() {
    updateBoard(index);
  }

  return (
    <div onClick={handleClick} className={squareClassName}>
      {children}
    </div>
  )
}
