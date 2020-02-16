import { Config } from './game/config';
import Game from './game/game';

const gameConfig = new Config();

const game = new Game(gameConfig);
game.start();

const button = document.getElementById('playAgain');
button && button.addEventListener('click', () => game.start());