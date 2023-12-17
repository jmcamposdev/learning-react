import { Square } from './Square.jsx'

export function Board ({ board, updateBoard }) {
  return (
    <section className='game'>
      {
          board.map((cell, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {cell}
              </Square>
            )
          })
        }
    </section>
  )
}
