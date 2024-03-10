import { useEffect, useState } from 'react'
import { getRandomFact } from '../services/fact'

const useCatFact = () => {
  const [fact, setFact] = useState('')

  const refreshFact = async () => {
    const newFact = await getRandomFact()
    setFact(newFact)
  }

  useEffect(refreshFact, [])

  return { fact, refreshFact }
}

export default useCatFact
