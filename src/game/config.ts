import { IConfig } from './interfaces';


export class Config implements IConfig {
    width: number = 300;
    height: number = 300;
    backgroundColor: string = '#EEE';
    intervalTime: number = 20;
    canvasElement: string = 'game';
}