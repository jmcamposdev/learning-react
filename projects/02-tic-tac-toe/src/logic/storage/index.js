export function saveGameToStorage ({board, turn}) {
  console.log(board);
  window.localStorage.setItem('board', JSON.stringify(board));
  window.localStorage.setItem('turn', turn);
}

export function resetGameStorage () {
  window.localStorage.removeItem('board');
  window.localStorage.removeItem('turn');
}