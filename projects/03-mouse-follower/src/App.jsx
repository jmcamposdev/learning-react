import { useEffect, useState } from 'react'

/* ********************** */
// Functions
/* ********************** */
const generateRandomPosition = () => {
  const randomX = Math.floor(Math.random() * window.innerWidth)
  const randomY = Math.floor(Math.random() * window.innerHeight)
  return { x: randomX, y: randomY }
}

function isHovering (randomPosition, position) {
  console.log('randomPosition', randomPosition.x)
  console.log('position', position.x)
  const differentX = randomPosition.x - position.x
  const differentY = randomPosition.y - position.y
  if (Math.abs(differentX) < 50 && Math.abs(differentY) < 50) {
    console.log('isHovering')
    return true
  }
  return false
}

function App () {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [randomPosition, setRandomPosition] = useState(generateRandomPosition())
  const [isCursorHoveringBall, setIsCursorHoveringBall] = useState(false)

  /* ********************** */
  // UseEffect
  /* ********************** */
  // Control the cursor circle
  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event
      setPosition({ x: clientX, y: clientY })

      if (isHovering(randomPosition, { x: clientX, y: clientY }) && enabled) {
        setIsCursorHoveringBall(true)
      }
    }

    if (enabled) {
      // Add the event listener to the window
      window.addEventListener('pointermove', handleMove)
      // Put the cursor ball in the cursor position
      setPosition({ x: window.clientX, y: window.clientY })
    }

    // Clean the useEffect
    // This function is called when the component is unmounted or when the enabled state changes
    return () => {
      // Remove the event listener
      window.removeEventListener('pointermove', handleMove)
      // Reset the position
      setPosition({ x: 0, y: 0 })
    }
  }, [enabled, randomPosition])

  // Control the random circles
  useEffect(() => {
    if (isCursorHoveringBall) {
      setRandomPosition(generateRandomPosition())
    }

    // Clean the useEffect
    return () => {
      setIsCursorHoveringBall(false)
    }
  }, [isCursorHoveringBall])
  return (
    <main>
      <div
        className='cursorCircle' style={{
          position: 'absolute',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          border: '1px solid #fff',
          borderRadius: '50%',
          opacity: 0.8,
          pointerEvents: 'none',
          left: -25,
          top: -25,
          width: 50,
          height: 50,
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
      />
      <button onClick={() => { setEnabled(!enabled) }}>{enabled ? 'Disable' : 'Activate'} follow pointer</button>

      <div
        className='randomCircle' style={{
          transform: `translate(${randomPosition.x}px, ${randomPosition.y}px)`
        }}
      />
    </main>
  )
}

export default App
