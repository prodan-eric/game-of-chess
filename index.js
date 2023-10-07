
// initial phase
const movementService = new MovementService(8, 8);
const pathValidatorService = new PathValidatorService();
const board = new Board();
const playerA = new Player('white');
const playerB = new Player('black');
const game = new Game(board, playerA, playerB);

//configuration phase
game.setup();

const makeMove = () => game.runGame();
const pauseGame = () => game.pauseGame();
const resumeGame = () => game.start();

//game start
//game.start();




