import Food from './food';
import { IConfig, IGame, EDirections } from './interfaces';
import Snake from './snake';

const KEYBOARD_EVENT = 'keyup';

export default class Game implements IGame {
    width: number = 300;
    height: number = 300;
    backgroundColor: string = '#EEE';
    intervalTime: number = 20;
    canvas: HTMLCanvasElement;
    config: IConfig;
    private _game: CanvasRenderingContext2D;
    private _interval: NodeJS.Timeout;
    private _food: Food;
    private _snake: Snake;
    private _onKeyEventBind: any;

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
        this._snake.init();
        this._addListeners();
        this._interval = setInterval(this.update.bind(this), this.intervalTime);
    }


    getContext (): CanvasRenderingContext2D {
        return this._game;
    }

    update () {
        this._clearGame();
        this._snake.update();
        this._food.generate();
    }

    private _onKeyEvent (event: KeyboardEvent) {
        console.log('KeyboardEvent:', event, this);
        const key = event.key as EDirections;
        this._snake.changeDirection(key);
    }

    private _addListeners () {
        document.removeEventListener(KEYBOARD_EVENT, this._onKeyEventBind);
        document.addEventListener(KEYBOARD_EVENT, this._onKeyEventBind);
    }

    private _clearGame () {
        this._game.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

}
