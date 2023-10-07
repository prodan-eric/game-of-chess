class MovementService {
  w
  h
  constructor (w, h) {
    this.w = w
    this.h = h
  }

  queen (x, y) {
    const moves = []
    //lines
    let x5, y5, x6, y6
    x5 = x6 = x
    y5 = y6 = x
    //diagonals
    let x1, y1, x2, y2, x3, y3, x4, y4
    x1 = x2 = x3 = x4 = x
    y1 = y2 = y3 = y4 = y
    //lines
    while (x5 < 7) {
      ++x5
      moves.push({ x: x5, y: y })
    }
    while (x6 > 0) {
      --x6
      moves.push({ x: x6, y: y })
    }
    while (y5 < 7) {
      ++y5
      moves.push({ x: x, y: y5 })
    }
    while (y6 > 0) {
      --y6
      moves.push({ x: x, y: y6 })
    }

    //diagonals
    while (x1 < 7 && y1 < 7) {
      ++x1
      ++y1
      moves.push({ x: x1, y: y1 })
    }
    while (x2 > 0 && y2 > 0) {
      --x2
      --y2
      moves.push({ x: x2, y: y2 })
    }
    while (x3 > 0 && y3 < 7) {
      --x3
      ++y3
      moves.push({ x: x3, y: y3 })
    }
    while (y4 > 0 && x4 < 7) {
      ++x4
      --y4
      moves.push({ x: x4, y: y4 })
    }
    return moves
  }

knight(x, y) {
        const max = this.h;
        
        let arr = [];
        if ( (y + 2 < max) && (x + 1 < max) ) {
            arr.push({x: x + 1, y: y + 2})
        }
        if ( (y + 1 < max) && (x + 2 < max)) {
            arr.push({x: x + 2, y: y + 1})
        }
        if( ( y - 1 >= 0) && (x - 2 >= 0)) {
            arr.push({x: x - 2, y: y - 1})
        }
        if( ( y - 2 >= 0) && (x - 1 >= 0)) {
            arr.push({x: x - 1, y: y - 2})
        }
        if( (y + 2 < max) && (x - 1 >=0)) {
            arr.push({x: x - 1, y: y + 2})
        }
        if((y + 1 < max) && (x - 2 >= 0)) { 
            arr.push({x: x - 2, y: y + 1})
        }
        if((y - 1 >= 0) && (x + 2 < max)) {
            arr.push({x: x + 2, y: y - 1})
        }
        if((y - 2 >= 0) && (x + 1 < max)) {
            arr.push({x: x + 1, y: y - 2})
        }
        return arr;
    }

  bishop (x, y) {
    const moves = [];
    let x1, y1, x2, y2, x3, y3, x4, y4
    x1 = x2 = x3 = x4 = x
    y1 = y2 = y3 = y4 = y
    //diagonals
    while (x1 < 7 && y1 < 7) {
      ++x1
      ++y1
      moves.push({ x: x1, y: y1 })
    }
    while (x2 > 0 && y2 > 0) {
      --x2
      --y2
      moves.push({ x: x2, y: y2 })
    }
    while (x3 > 0 && y3 < 7) {
      --x3
      ++y3
      moves.push({ x: x3, y: y3 })
    }
    while (y4 > 0 && x4 < 7) {
      ++x4
      --y4
      moves.push({ x: x4, y: y4 })
    }
    return moves
  }

  getPositionsByPiece (piece) {
    switch (piece.type) {
      case 'Q':
        return this.queen(piece.x, piece.y)
      case 'B':
        return this.bishop(piece.x, piece.y)
      case 'K':
        return this.knight(piece.x, piece.y)
      default:
        throw Error('unknown piece type', piece.type)
    }
  }
}
