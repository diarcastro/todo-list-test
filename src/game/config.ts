import { IConfig } from './interfaces';


export class Config implements IConfig {
    width: number = 300;
    height: number = 300;
    backgroundColor: string = '#EEE';
    intervalTime: number = 200;
    canvasElement: string = 'game';
    normalScore: number = 1;
    specialScore: number = 9;
}