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

    const move = (boardId, player) => {
        if (boardId < 0) return
        if (boardId > state.length-1) return
        if (state[boardId]) return
        state[boardId] = player
    }

    return { state, move }
})()

const game = (function() {
    const players = ['X', 'O']
    let cur = 0

    const play = boardId => {
        board.move(boardId, players[cur])
        cur = cur === 1 ? 0 : 1
    }

    const getCurrentPlayer = () => players[cur]

    return { play, getCurrentPlayer }
})()

const display = (function() {
    const boardEl = document.querySelector('.board')
    const messageEl = document.querySelector('.message')
    messageEl.innerText = `${game.getCurrentPlayer()}'s turn!`

    let exit = false

    board.state.forEach((val, boardId) => {
        const squareEl = document.createElement('button')
        squareEl.classList.add('square')
        squareEl.addEventListener('click', () => {
            if (exit) return
            if (squareEl.innerText) return

            squareEl.innerText = game.getCurrentPlayer()
            game.play(boardId)

            const winner = calculateWinner(board.state)

            if (winner) {
                messageEl.innerText = `Game Over. ${winner} wins!`
                exit = true
            } else {
                messageEl.innerText = `${game.getCurrentPlayer()}'s turn!`
            }
        })
        boardEl.append(squareEl)
    })
})()
