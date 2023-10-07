class Cell {
  color;
  x;
  y;
  piece = null;
  isBusy = false;

  constructor(x, y) {
    this.x = x;
    this.y = y;

    const sum = (x + y) % 2;
    this.color = sum ? "white" : "black";
    this.createCellDiv();
  }

  occupyBy(piece) {
    if(piece.alive){
      this.piece = piece;
      this.isBusy = true;
    }
  }

  empty() {
    this.piece = null;
    this.isBusy = false;
  }

  isOccupied(){
    if(this.piece!==null) return true;
    else return false;
  }

  createCellDiv(){
    const board = document.getElementById('board');
    const cell = document.createElement('div');
      cell.classList.add('cell');
      if(this.color==="black") cell.classList.add('blackCell'); 
      else cell.classList.add('whiteCell');
      board.appendChild(cell);        
  }

}
