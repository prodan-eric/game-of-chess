class Board {
  cells = []

  constructor() {
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        const cell = new Cell(x, y)
        this.cells.push(cell)
      }
    }
  }

  getCell(x, y) {
    return this.cells.find((cell) => cell.x == x && cell.y == y)
  }

  //3
  getRandomCell() {
    const x = Math.round(Math.random() * 7)
    const y = Math.round(Math.random() * 7)
    return this.getCell(x, y)
  }

  //1
  setupPlayersPieces(PlayerA, PlayerB) {
    const playerAPieces = PlayerA.getPieces()
    const playerBPieces = PlayerB.getPieces()
    const allPieces = [...playerAPieces, ...playerBPieces]

    allPieces.forEach((piece) => this.assignPieceToRandomCell(piece))
  }

  //2
  assignPieceToRandomCell(piece) {
    const cell = this.getRandomCell()
    if (cell.isBusy) {
      this.assignPieceToRandomCell(piece)
    } else if (piece.alive) {
      cell.occupyBy(piece)
      piece.setPosition(cell.x, cell.y)
    }
  }

  updatePieceDivs(playerA, playerB) {
    const oldPieces = document.getElementsByClassName("piece")
    const newPieces = [...playerA.pieces, ...playerB.pieces]

    for (let i = 0; i < oldPieces.length; i++) {
      if (!newPieces[i].alive) oldPieces[i].style.visibility = "hidden"
      oldPieces[i].style.marginLeft = `${newPieces[i].x * 50}px`
      oldPieces[i].style.marginTop = `${newPieces[i].y * 50}px`
    }
  }
}
