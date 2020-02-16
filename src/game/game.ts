import Food from './food';
import { IConfig, IGame, EDirections, ESnakeEvents } from './interfaces';
import { Snake, SnakeEvent } from './snake';
import debug from './debug';
import { Score } from './score';
import GameArea from './game-area';

const KEYBOARD_EVENT = 'keyup';

export default class Game implements IGame {
    width: number = 300;
    height: number = 300;
    backgroundColor: string = '#EEE';
    intervalTime: number = 20;
    canvas: HTMLCanvasElement;
    config: IConfig;
    area: GameArea;

    private _game: CanvasRenderingContext2D;
    private _interval: NodeJS.Timeout;
    private _food: Food;
    private _snake: Snake;
    private _onKeyEventBind: any;
    private _score: Score;

    constructor (gameConfig: IConfig) {
        this.config = gameConfig;
        this.canvas = document.getElementById(gameConfig.canvasElement) as HTMLCanvasElement;
        this._food = new Food(this);
        this._onKeyEventBind = this._onKeyEvent.bind(this);
    }

    start () {
        this.width = this.config.width || this.width;
        this.height = this.config.height || this.height;
        this.backgroundColor = this.config.backgroundColor || this.backgroundColor;
        this.intervalTime = this.config.intervalTime || this.intervalTime;
        this.canvas.width = this.config.width;
        this.canvas.height = this.config.height;
        this.canvas.style.backgroundColor = this.config.backgroundColor;
        this._game = this.canvas.getContext('2d');
        this._clearGame();
        if (this._interval) {
            clearInterval(this._interval);
        }
        this._snake = new Snake(this);
        this._score = new Score(this.getContext());
        this.area = new GameArea(this);
        this.area.draw();
        this._snake.init();
        this._addListeners();
        this._interval = setInterval(this.update.bind(this), this.intervalTime);
    }


    getContext (): CanvasRenderingContext2D {
        return this._game;
    }

    update () {
        this._clearGame();
        this.area.draw();
        this._food.generate();
        this._snake.update();
        this._score.draw();
        this._snake.detectCollision(this._food);
    }

    gameOver () {
        clearInterval(this._interval);
    }

    private _onKeyEvent (event: KeyboardEvent) {
        const key = event.key as EDirections;
        this._snake.changeDirection(key);
    }

    private onCollision (event: SnakeEvent) {
        if (event.isBorderCollision) {
            try {
                const direction = this._snake.direction;
                if (direction === EDirections.RIGHT || direction === EDirections.LEFT) {
                    this.area.width -= this.config.gameAreaDecrease;
                } else {
                    this.area.height -= this.config.gameAreaDecrease;
                }

                this._snake.reverse();
                this._food.eaten = true;
                this.update();
            } catch(e) {
                this.gameOver();
            }


        } else {
            const score = event.special ? this.config.specialScore : this.config.normalScore;
            this._food.eaten = true;
            this._snake.addPiece();
            this._score.increase(score);
            if (event.special) {
                this._snake.addPiece();
            }
            this.update();
        }
    }

    private _addListeners () {
        document.removeEventListener(KEYBOARD_EVENT, this._onKeyEventBind);
        document.addEventListener(KEYBOARD_EVENT, this._onKeyEventBind);
        this._snake.onCollision(this.onCollision.bind(this))
    }

    private _clearGame () {
        this._game.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

}
