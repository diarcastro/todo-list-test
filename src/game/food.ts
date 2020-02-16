import { IGame } from './interfaces'
import { Point } from './point';

const SECOND = 1000;

export default class Food extends Point{
    backgroundColor: string = '#FF7F66';
    strokeColor: string = '#3F464C';
    minTime: number = 4;
    maxTime: number = 6;
    timeElapsed: number = 0;
    lastTimeOut: number = 0;
    eaten: boolean = false;

    private _game: IGame;

    constructor (game: IGame) {
        super();
        this._game = game;
    }

    randomPosition() {
        this.x = Math.floor(Math.random() * (this._game.config.width - this.width));
        this.y = Math.floor(Math.random() * (this._game.config.height - this.height));
    }

    checksRegenerate() {
        const timeout = this.lastTimeOut * SECOND;
        if (this.eaten || this.timeElapsed * this._game.config.intervalTime >= timeout) {
            this.lastTimeOut = Math.round((Math.random() * this.maxTime)) + this.minTime;
            this.randomPosition();
            this.timeElapsed = 0;
            this.eaten = false;
        }
    }

    generate () {
        this.timeElapsed++;
        this.checksRegenerate();
        const game = this._game.getContext();
        game.beginPath();
        game.rect(this.x, this.y, this.width, this.height);
        game.fillStyle = this.backgroundColor;
        game.strokeStyle = this.strokeColor;
        game.stroke();
        game.fill();

    }
}
