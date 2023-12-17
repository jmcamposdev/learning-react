import { useState } from 'react';
import './App.css'

const TURNS = {
  X: 'x',
  O: 'o'
}


const Square = ({children, isSelected, updateBoard, index} ) => {
  const squareClassName = `square ${isSelected ? 'is-selected' : ''}`;
 
  function handleClick() {
    updateBoard(index);
  }

  return (
    <div onClick={handleClick} className={squareClassName}>
      {children}
    </div>
  )
};

const WINNER_COMBINATIONS = [
  // Horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // Vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  // Diagonal
  [0, 4, 8],
  [2, 4, 6]
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null); // Null no winner, false tie, X or O

  const checkWinner = (boardToCheck) => {
    // Check if there is a winner
    for (let i = 0; i < WINNER_COMBINATIONS.length; i++) {
      const [a, b, c] = WINNER_COMBINATIONS[i];
      if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
        return boardToCheck[a];
      }
    }

    // No winner yet
    return null;
  }

  const checkTie = (boardToCheck) => {
    return boardToCheck.every(cell => cell !== null);
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  }

  function updateBoard(index) {
    // If the cell is already filled, return
    if (board[index] || winner) return

    // Create a new board with the new value
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    // Change the turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    // Check if there is a winner
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else if (checkTie(newBoard)) {
      setWinner(false);
    }
  }


  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <section className="game">
        {
          board.map((cell, index) => {
            return (
              <Square 
                key={index}
                index={index}
                updateBoard={updateBoard}>
                {cell}
              </Square>
            )
          })
        }
      </section>

      <section className="turn">
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
      {
        winner !== null &&  (
          <section className="winner">
            <div className="text">
              <h2>
                {
                  winner === false ? 'Tie' : 'Wins'
                }
              </h2>

              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>Try Again</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  )
}

export default App
