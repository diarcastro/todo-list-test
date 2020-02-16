import { Config } from './game/config';
import Game from './game/game';

const gameConfig = new Config();

const game = new Game(gameConfig);
game.start();


/* const SEGMENT_SIZE = 16;

const FOOD_WIDTH = 16;
const FOOD_HEIGHT = 16;
const FOOD_MIN_TIMEOUT = 4;
const FOOD_MAX_TIMEOUT = 10;
const BUTTON_TEXT = 'Play Again!'; */




// const update = () => {
//     game.clearRect(0, 0, canvas.width, canvas.height);
//     food.generate();
// };


// const interval = setInterval(update, gameConfig.intervalTime);




