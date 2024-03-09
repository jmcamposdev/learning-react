import { useEffect, useState } from 'react'

const App = () => {
  const [fact, setFact] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  /**
   * Get the fact calling to the API in the first Render
   */
  useEffect(() => {
    fetch('https://catfact.ninja/fact')
      .then(response => response.json())
      .then(response => setFact(response.fact))
      .catch(err => console.log(err))
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

  return (
    <>
      <h1>Fact</h1>
      <p>{fact}</p>
      <img src={imageUrl} alt='' />
    </>
  )
}

export default App
