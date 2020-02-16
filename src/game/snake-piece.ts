import { Point } from "./point";

export default class SnakePiece extends Point {

    backgroundColor: string = '#7ECEFC';
    strokeColor: string = '#2186C4';

    private _gameContext: CanvasRenderingContext2D;

    constructor (game: CanvasRenderingContext2D) {
        super();
        this._gameContext = game;
    }

    draw () {
        this._gameContext.beginPath();
        this._gameContext.rect(this.x, this.y, this.width, this.height);
        this._gameContext.fillStyle = this.backgroundColor;
        this._gameContext.strokeStyle = this.strokeColor;
        this._gameContext.stroke();
        this._gameContext.fill();
    }


}