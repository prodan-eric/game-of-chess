class Game {
  board
  playerA
  playerB
  currentPlayer
  opponentPlayer

  isStarted = false
  isPaused = false
  isOver = false

  timer

  constructor(board, playerA, playerB) {
    this.board = board
    this.playerA = playerA
    this.playerB = playerB
  }

  // configuration phase
  setup() {
    this.board.setupPlayersPieces(this.playerA, this.playerB)
    this.currentPlayer = playerA
    this.opponentPlayer = playerB
  }

  start() {
    this.timer = setInterval(() => {
      this.runGame()
    }, 100)

    document.getElementById("start").disabled = true
  }

  runGame() {
    if (this.checkForDraw()) {
      clearInterval(this.timer)
      document.getElementById("status").innerHTML = `It's a draw.`
    } else if (this.currentPlayer.hasPiecesAlive()) {
      this.playerMoves()
      this.switchPlayer()
      //console.log(JSON.stringify([...this.playerA.pieces, ...this.playerB.pieces]));
    } else {
      clearInterval(this.timer)
      document.getElementById("status").innerHTML = `${capitalizeFirstLetter(
        this.opponentPlayer.color
      )} wins.`
    }
  }

  pauseGame() {
    clearInterval(this.timer)
    document.getElementById("start").disabled = false
  }

  playerMoves() {
    const playerMove = new PlayerMove(this.board, this.currentPlayer)
    const { destination, movingPiece } = playerMove.moveRandomPiece()

    this.captureCheck(destination)

    this.board.getCell(movingPiece.x, movingPiece.y).empty()
    this.currentPlayer.movePiece(movingPiece, destination)
    movingPiece.x = destination.x
    movingPiece.y = destination.y
    this.board.getCell(destination.x, destination.y).occupyBy(movingPiece)
    this.board.updatePieceDivs(this.playerA, this.playerB)
  }

  captureCheck(destination) {
    const opponentPiece = this.opponentPlayer.getPieceByPosition(
      destination.x,
      destination.y
    )
    if (!opponentPiece) return
    this.opponentPlayer.eliminatePiece(opponentPiece)
  }

  checkForDraw() {
    const player1Len = this.currentPlayer.pieces.filter(
      (piece) => piece.alive
    ).length
    const player2Len = this.opponentPlayer.pieces.filter(
      (piece) => piece.alive
    ).length
    if (player1Len > 1 || player2Len > 1) return false
    if (
      this.currentPlayer.pieces[0].type !== "B" ||
      this.opponentPlayer.pieces[0].type !== "B"
    )
      return false
    const bishop1 = this.currentPlayer.pieces[0]
    const bishop2 = this.opponentPlayer.pieces[0]
    if (
      this.board.getCell(bishop1.x, bishop1.y).color !==
      this.board.getCell(bishop2.x, bishop2.y).color
    )
      return true
    else return false
  }

  switchPlayer() {
    if (this.currentPlayer.color === "black") {
      this.currentPlayer = this.playerA
      this.opponentPlayer = this.playerB
    } else {
      this.currentPlayer = this.playerB
      this.opponentPlayer = this.playerA
    }
    return
  }

  pickRandomItem(array) {
    const index = Math.round(Math.random() * (array.length - 1))
    return array[index]
  }
}

function capitalizeFirstLetter(inputString) {
  console.log(inputString)
  return inputString.charAt(0).toUpperCase() + inputString.slice(1)
}
