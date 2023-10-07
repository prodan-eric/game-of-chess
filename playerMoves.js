class PlayerMove {

  board;
  pieces;
  piece;

  directions;
  destination;

  directionCells;
  destinationCell;

  output;

  constructor(board, player){
      this.pieces = [...player.getPieces()].filter(piece=> piece.alive);
      this.output = null;
      this.board = board;
  }

  setPiece(){
      
      if(!this.pieces.length) {
         // this.invalidatePlayer();
          return 
      }           
     this.piece = pickRandomItem(this.pieces)
  }

  validator(piece, positionCell, cells) {
      if (!cells.length) return piece;
      if(piece.x===positionCell.x&&piece.y===positionCell.y) return false;
  
      const isPathValid = pathValidatorService.validatePath(piece, positionCell, cells)
      
      return isPathValid;
    }
  
  setDirection() {
      this.directions = movementService.getPositionsByPiece(this.piece);
      this.destination = pickRandomItem(this.directions);
  }

  setDirectionCell(){
       this.directionCells = this.directions.map(pos => this.board.getCell(pos.x, pos.y));
  }

  setDestinationCell(){
      
      if(!this.directionCells.length) {
         this.invalidatePiece();
         return 
      }
          
      this.destinationCell = pickRandomItem(this.directionCells);
      this.validateDirection();
  }

  invalidateDestination(){
      removeItemFromList(this.destinationCell, this.directionCells)
  }

  invalidatePiece(){
      removeItemFromList(this.piece, this.pieces)
  }

  validateDirection(){
      const pieceCheck = this.validator(this.piece, this.destinationCell, this.directionCells);
      if(pieceCheck){
        this.output = this.destinationCell;
      } else {
        this.invalidateDestination();
        this.setDestinationCell();
      }
  }

  moveRandomPiece(){
     this.setPiece();
     this.setDirection();
     this.setDirectionCell();
     this.setDestinationCell();

     //console.log(this.pieces);
     if(!this.output) this.moveRandomPiece();
     return {
      movingPiece: this.piece,
      destination: this.output
     } 
  }
 
}

function pickRandomItem(array) {
  const index = Math.round(Math.random() * (array.length - 1));
  return array[index];
}

function removeItemFromList(item, array) {
  const index = array.indexOf(item)
  array.splice(index, 1);
}