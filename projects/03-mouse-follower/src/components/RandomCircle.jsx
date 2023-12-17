export function RandomCircle ({ position }) {
  return (
    <div
      className='randomCircle' style={{
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
    />
  )
}
