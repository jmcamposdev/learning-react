import { useEffect, useState } from 'react'

function App () {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event
      setPosition({ x: clientX, y: clientY })
    }
    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    // Clean the useEffect
    // This function is called when the component is unmounted or when the enabled state changes
    return () => {
      // Remove the event listener
      window.removeEventListener('pointermove', handleMove)
      // Reset the position
      setPosition({ x: 0, y: 0 })
    }
  }, [enabled])

  const handleCursorButton = () => {
    setEnabled(!enabled)
  }
  return (
    <main>
      <div style={{
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
      <button onClick={handleCursorButton}>{enabled ? 'Disable' : 'Activate'} follow pointer</button>
    </main>
  )
}

export default App
