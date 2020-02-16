import { IConfig } from './interfaces';


export class Config implements IConfig {
    width: number = 800;
    height: number = 800;
    backgroundColor: string = '#AAA';
    intervalTime: number = 70;
    canvasElement: string = 'game';
    normalScore: number = 1;
    specialScore: number = 9;
    gameAreaDecrease: number = 9;
}