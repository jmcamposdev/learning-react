import { useEffect, useState } from 'react'
import { getRandomFact } from './services/fact'

const App = () => {
  const [fact, setFact] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  /**
   * Get the fact calling to the API in the first Render
   */
  useEffect(async () => {
    const newFact = await getRandomFact()
    setFact(newFact)
  }, [])

  /**
   * Get the cat image when the fact state change
   */
  useEffect(() => {
    if (fact.length === 0) return

    const firstLetter = fact.split()[0]

    fetch(`https://cataas.com/cat/says/${firstLetter}`)
      .then(response => setImageUrl(response.url))
      .catch(err => console.error(err))
  }, [fact])

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
