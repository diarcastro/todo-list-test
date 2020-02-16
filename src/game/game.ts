import Food from './food';
import { IConfig, IGame } from './interfaces';

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

    constructor (gameConfig: IConfig) {
        this.config = gameConfig;
        this.canvas = document.getElementById(gameConfig.canvasElement) as HTMLCanvasElement;
        this._food = new Food(this);
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
        this._interval = setInterval(this.update.bind(this), this.intervalTime);
    }

    getContext (): CanvasRenderingContext2D {
        return this._game;
    }

    update () {
        this._clearGame();
        this._food.generate();
    }

    private _clearGame () {
        this._game.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
