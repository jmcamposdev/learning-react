import { WINNER_COMBINATIONS } from '../constants';

export const checkWinner = (boardToCheck) => {
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

export const checkTie = (boardToCheck) => {
  return boardToCheck.every(cell => cell !== null);
}