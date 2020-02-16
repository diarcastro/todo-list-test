import { IGame } from './interfaces'
import { Point } from './point';

export default class GameArea extends Point{
    backgroundColor: string = '#EEE';
    strokeColor: string = '#3F464C';

    private _game: IGame;

    constructor (game: IGame) {
        super();
        this._game = game;
        this.x = 0;
        this.y = 0;
        this.width = this._game.config.width;
        this.height = this._game.config.height;
    }

    draw () {
        const game = this._game.getContext();
        game.beginPath();
        game.rect(this.x, this.y, this.width, this.height);
        game.fillStyle = this.backgroundColor;
        game.strokeStyle = this.strokeColor;
        game.fill();
        game.stroke();

    }
}
