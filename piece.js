class Piece {
  type;
  color;
  x;
  y;
  alive;
  
  constructor(type, color, x, y) {
    this.type = type;
    this.color = color;
    this.x = x;
    this.y = y;
    this.alive = true;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

}