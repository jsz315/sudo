import * as Phaser from 'phaser'
import {StartScene} from './StartScene'

function init(canvas:HTMLCanvasElement){
    const config:Phaser.Types.Core.GameConfig = {
        type: Phaser.CANVAS,
        scene: [StartScene],
        canvas: canvas,
        backgroundColor: 0xffffff,
        width: 750,
        height: 750
    }
    new Phaser.Game(config);
}

export default {init};
