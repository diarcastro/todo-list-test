export interface IConfig {
    width: number;
    height: number;
    backgroundColor: string;
    intervalTime: number;
    canvasElement: string;
}

export interface IGame {
    config: IConfig;
    getContext(): CanvasRenderingContext2D;
}

export const enum EDirections {
    RIGHT   = 'ArrowRight',
    LEFT    = 'ArrowLeft',
    BOTTOM  = 'ArrowDown',
    TOP     = 'ArrowUp',
}