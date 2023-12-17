import { useEffect, useState } from 'react'
import { CursorCircle } from './components/CursorCircle'
import { RandomCircle } from './components/RandomCircle'

const INITIAL_SECONDS_COUNT = 20
const INITIAL_CURSOR_POSITION = { x: 0, y: 0 }
const INITIAL_IS_CURSOR_HOVERING_BALL = false
const INITIAL_SCORE = 0
const SUM_SECONDS_EACH_LEVEL = 7
/* ********************** */
// Functions
/* ********************** */
const generateRandomPosition = () => {
  const randomX = Math.floor(Math.random() * (window.innerWidth - 50))
  const randomY = Math.floor(Math.random() * (window.innerHeight - 50))
  return { x: randomX, y: randomY }
}

function isHovering (randomPosition, position) {
  const differentX = randomPosition.x - position.x
  const differentY = randomPosition.y - position.y
  if (Math.abs(differentX) < 50 && Math.abs(differentY) < 50) {
    return true
  }
  return false
}

function App () {
  const [cursorPosition, setCursorPosition] = useState(INITIAL_CURSOR_POSITION)
  const [randomPosition, setRandomPosition] = useState(generateRandomPosition())
  const [isCursorHoveringBall, setIsCursorHoveringBall] = useState(INITIAL_IS_CURSOR_HOVERING_BALL)
  const [score, setScore] = useState(INITIAL_SCORE)
  const [secondsCount, setSecondsCount] = useState(INITIAL_SECONDS_COUNT)
  const [isGameStopped, setIsGameStopped] = useState(false)

  const resetGame = () => {
    setScore(0)
    setRandomPosition(generateRandomPosition())
    setSecondsCount(20)
    setIsGameStopped(false)
  }

  /* ********************** */
  // UseEffect
  /* ********************** */
  // Control the cursor circle
  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event
      setCursorPosition({ x: clientX, y: clientY })
      if (isHovering(randomPosition, { x: clientX, y: clientY }) && !isCursorHoveringBall) {
        const newScore = score + 1
        if (newScore % SUM_SECONDS_EACH_LEVEL === 0) {
          console.log('sum seconds' + secondsCount)
          setSecondsCount(secondsCount + 1)
        }
        setScore(newScore)
        setIsCursorHoveringBall(true)
      }
    }

    // Add the event listener to the window
    window.addEventListener('pointermove', handleMove)
    // Put the cursor ball in the cursor position
    setCursorPosition({ x: window.clientX, y: window.clientY })
    // Clean the useEffect
    // This function is called when the component is unmounted or when the enabled state changes
    return () => {
      // Remove the event listener
      window.removeEventListener('pointermove', handleMove)
      // Reset the position
      setCursorPosition({ x: 0, y: 0 })
    }
  }, [randomPosition])

  // When the cursor is hovering the ball
  useEffect(() => {
    if (isCursorHoveringBall && !isGameStopped) {
      setRandomPosition(generateRandomPosition())
    }

    // Clean the useEffect
    return () => {
      setIsCursorHoveringBall(false)
    }
  }, [isCursorHoveringBall])

  // Count the seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsCount(secondsCount - 1)
    }, 1000)

    if (secondsCount === 0) {
      clearInterval(interval)
      setIsGameStopped(true)
    }

    return () => {
      clearInterval(interval)
    }
  }, [secondsCount])

  return (
    <main>
      <CursorCircle position={cursorPosition} width={50} height={50} />
      <RandomCircle position={randomPosition} />

      <h1>Time</h1>
      <h2 style={{ textAlign: 'center' }}>{secondsCount}</h2>
      <h1>Score</h1>
      <h2 style={{ textAlign: 'center' }}>{score}</h2>
      <button onClick={resetGame}>Reset Score</button>
    </main>
  )
}

export default App
