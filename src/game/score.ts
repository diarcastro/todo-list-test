const LS_SCORE_KEY_NAME = 'SnakeScore';
const SCORE_TEXT = 'Score:';

export class Score {
    strokeColor: string = '#000';
    higherScoreStrokeColor: string = '#00F';

    private _gameContext: CanvasRenderingContext2D;
    private _lastScore: number = 0;
    private _value: number = 0;

    constructor (game: CanvasRenderingContext2D) {
        this._gameContext = game;
        const lastScore = localStorage.getItem(LS_SCORE_KEY_NAME);
        this._lastScore = Number(lastScore);
    }

    draw () {
        const isHigherScore = this._lastScore < this._value;
        this._gameContext.beginPath();
        const text = `${SCORE_TEXT} ${this._value}`;
        this._gameContext.fillStyle = isHigherScore ? this.higherScoreStrokeColor : this.strokeColor;
        this._gameContext.font = '15px Verdana';
        this._gameContext.fillText(text, 20, 30);

    }

    increase (value: number) {
        this._value += value;
        this._saveScore();
    }

    private _saveScore () {
        localStorage.setItem(LS_SCORE_KEY_NAME, String(this._value));
    }
}