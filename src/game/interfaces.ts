export interface IConfig {
    width: number;
    height: number;
    backgroundColor: string;
    intervalTime: number;
    canvasElement: string;
}

export interface IGame {
    config: IConfig;
    getContext: Function;
}