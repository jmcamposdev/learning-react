import { useEffect, useState } from 'react'

const useCatImage = ({ fact }) => {
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    if (fact.length === 0) return

    const firstLetter = fact.split()[0]

    fetch(`https://cataas.com/cat/says/${firstLetter}`)
      .then(response => setImageUrl(response.url))
      .catch(err => console.error(err))
  }, [fact])

  return { imageUrl }
}

export default useCatImage
