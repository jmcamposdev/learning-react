import { useEffect, useState } from 'react'
import { getRandomFact } from './services/fact'
import useCatImage from './hooks/useCatImage'

const App = () => {
  const [fact, setFact] = useState('')
  const { imageUrl } = useCatImage({ fact })

  /**
   * Get the fact calling to the API in the first Render
   */
  useEffect(async () => {
    const newFact = await getRandomFact()
    setFact(newFact)
  }, [])

  /**
   * Generate a random fact
   */
  const handleClick = async () => {
    const newFact = await getRandomFact()
    setFact(newFact)
  }

  return (
    <>
      <h1>Fact</h1>
      <button type='button' onClick={handleClick}>Generate Fact</button>
      <p>{fact}</p>
      <img src={imageUrl} alt='' />
    </>
  )
}

export default App
