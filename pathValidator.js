class PathValidatorService {

  validateDestination(piece, positionCell) {
    if (!positionCell.isBusy) return true;
    return !(piece.color === positionCell.piece.color)
  }

  validateMoves(piece, positionCell, cells) {

    if (!this.validateDestination(piece, positionCell)) return false;

    let iX = piece.x;
    let iY = piece.y;
    const pX = positionCell.x;
    const pY = positionCell.y;

    //console.log('start from:', iX, iY);
    //console.log('to ', pX, pY);

    const opX = (pX - iX) / Math.abs(pX - iX) || 0;
    const opY = (pY - iY) / Math.abs(pY - iY) || 0;

    do {
      if (iX !== pX) iX = iX + opX;
      if (iY !== pY) iY = iY + opY;
      
      const cell = cells.find(c => c.x == iX && c.y === iY);

      if(!cell) return false;

      const isLast = cell.x === pX && cell.y === pY;

      //console.log(iX, iY);

      if (cell.isBusy && !isLast) return false;
      if (cell.isBusy && isLast) {
        const result = cell.piece.color === piece.color;
        return !result;
      }
      if (!cell.isBusy && isLast) return true;

    } while (iX !== pX && iY !== pY)
    return true;
  }

  validatePath(piece, positionCell, cells) {
    //console.log(piece);
    if (piece.type === 'K') {
      return this.validateDestination(piece, positionCell)
    }
    return this.validateMoves(piece, positionCell, cells)
  }

}
