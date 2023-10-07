class Player {
  color
  pieces = []

  constructor(color) {
    this.color = color
    this.pieces.push(new Piece("Q", color, 0, 0))
    this.pieces.push(new Piece("B", color, 0, 0))
    this.pieces.push(new Piece("K", color, 0, 0))

    this.createPieceDivs()
  }

  getPieces() {
    return this.pieces
  }

  getPiece(type) {
    return this.pieces.find((piece) => piece.type === type)
  }

  getPieceByPosition(x, y) {
    return this.pieces.find((piece) => piece.x === x && piece.y === y)
  }

  getRandomPiece() {
    const index = Math.round(Math.random() * 2)
    return this.pieces[index]
  }

  movePiece(movingPiece, destination) {
    if (!this.pieces) return

    const index = this.pieces.indexOf(movingPiece)

    this.pieces[index].x = destination.x
    this.pieces[index].y = destination.y
  }

  eliminatePiece(piece) {
    if (piece) {
      const index = this.pieces.indexOf(piece)
      this.pieces[index].alive = false
    }
  }

  hasPiecesAlive() {
    for (let i = 0; i < this.pieces.length; i++) {
      if (this.pieces[i].alive) return true
    }
  }

  createPieceDivs() {
    const board = document.getElementById("board")

    for (let i = 0; i < this.pieces.length; i++) {
      const piece = document.createElement("div")

      piece.classList.add("piece")
      if (this.pieces[i].color === "black") piece.classList.add("blackPiece")
      else piece.classList.add("whitePiece")
      piece.classList.add(`${this.pieces[i].color}${this.pieces[i].type}`)
      piece.style.marginLeft = `${this.pieces[i].x * 90}px`
      piece.style.marginTop = `${this.pieces[i].y * 90}px`

      board.appendChild(piece)
    }
  }
}
