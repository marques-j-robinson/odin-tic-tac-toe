/*
 * From ReactJs Tutorial
 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const board = (function() {
    const state = Array(9).fill(null)

    const get = () => {
        console.log(state)
        return state
    }
    const move = (boardId, player) => {
        if (boardId < 0) return
        if (boardId > state.length-1) return
        if (state[boardId]) return
        state[boardId] = player
    }

    return { get, move }
})()

const game = (function() {
    const players = ['X', 'O']
    let cur = 0

    const play = boardId => {
        board.move(boardId, players[cur])
        board.get()
        cur = cur === 1 ? 0 : 1
    }

    const getCurrentPlayer = () => players[cur]

    return { play, getCurrentPlayer }
})()

while (!calculateWinner(board.get())) {
    const currentPlayer = game.getCurrentPlayer()
    const playerSelection = prompt(`Player ${currentPlayer}, please select board position... Any number between 0 and 8!`)
    game.play(playerSelection)
}

console.log(`${calculateWinner(board.get())} Wins!`)
