import { IGame } from './interfaces'

const SECOND = 1000;

export default class Food {
    backgroundColor: string = '#FF7F66';
    strokeColor: string = '#3F464C';
    width: number = 16;
    height: number = 16;
    minTime: number = 4;
    maxTime: number = 6;
    timeElapsed: number = 0;
    lastTimeOut: number = 0;
    lastPosition: any = {};

    private _game: IGame;

    constructor (game: IGame) {
        this._game = game;
    }

    randomPosition() {
        const x = Math.floor(Math.random() * (this._game.config.width - this.width));
        const y = Math.floor(Math.random() * (this._game.config.height - this.height));
        return {x, y};
    }

    checksRegenerate() {
        const timeout = this.lastTimeOut * SECOND;
        if (this.timeElapsed * this._game.config.intervalTime >= timeout) {
            this.lastTimeOut = Math.round((Math.random() * this.maxTime)) + this.minTime;
            this.lastPosition = this.randomPosition();
            this.timeElapsed = 0;
        }
    }

    generate () {
        this.timeElapsed++;
        this.checksRegenerate();
        const game = this._game.getContext();
        game.beginPath();
        game.rect(this.lastPosition.x, this.lastPosition.y, this.width, this.height);
        game.fillStyle = this.backgroundColor;
        game.strokeStyle = this.strokeColor;
        game.stroke();
        game.fill();

    }
}
