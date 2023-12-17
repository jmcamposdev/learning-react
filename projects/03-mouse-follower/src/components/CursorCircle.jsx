export function CursorCircle ({ position, width, height }) {
  return (
    <div
      className='cursorCircle' style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        width: `${width}px`,
        height: `${height}px`
      }}
    />
  )
}
