export interface IConfig {
    width: number;
    height: number;
    backgroundColor: string;
    intervalTime: number;
    canvasElement: string;
    normalScore: number;
    specialScore: number;
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

export const enum ESnakeEvents {
    ON_COLLISION = 'onCollision',
}