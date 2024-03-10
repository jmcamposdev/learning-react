import useCatImage from './hooks/useCatImage'
import useCatFact from './hooks/useCatFact'

const App = () => {
  const { fact, refreshFact } = useCatFact()
  const { imageUrl } = useCatImage({ fact })

  /**
   * Generate a random fact
   */
  const handleClick = async () => {
    refreshFact()
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
