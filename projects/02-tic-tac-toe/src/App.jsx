import { useState } from 'react'
import './App.css'

import { TURNS } from './constants'
import { checkWinner, checkTie } from './logic/board.js'
import { resetGameStorage, saveGameToStorage } from './logic/storage/index.js'
import { Square } from './components/Square.jsx'
import { WinnerModal } from './components/WinnerModal.jsx'
import { Board } from './components/Board.jsx'

function App () {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage || TURNS.X
  })
  const [winner, setWinner] = useState(null) // Null no winner, false tie, X or O

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    // Remove the game from storage
    resetGameStorage()
  }

  function updateBoard (index) {
    // If the cell is already filled, return
    if (board[index] || winner) return

    // Create a new board with the new value
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // Change the turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // Save the game to storage
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })

    // Check if there is a winner
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else if (checkTie(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <Board board={board} updateBoard={updateBoard} />

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <section>
        <button onClick={resetGame}>Reset Game</button>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
