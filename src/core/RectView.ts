import * as Phaser from 'phaser';
import {ViewFactory} from './ViewFactory'
import { MapView } from './MapView';

export class RectView extends Phaser.GameObjects.Container {

    size:number;
    startTxt:Phaser.GameObjects.Text;
    endTxt:Phaser.GameObjects.Text;
    costTxt:Phaser.GameObjects.Text;
    color:number;
    background:Phaser.GameObjects.Polygon;
    wall:Phaser.GameObjects.Image;

    constructor(scene:Phaser.Scene, size:number, color:number){
        super(scene);
        this.color = color;
        this.size = size;
        this.createViews();
    }

    changeColor(color:number){
        this.color = color;
        this.background.fillColor = color;
        if(this.color == MapView.COLOR_BLOCK){
            this.wall.visible = true;
        }
        else{
            this.wall.visible = false;
        }
    }

    changeNumber(s:number, e:number, c:number){
        // this.startTxt.text = s.toString();
        // this.endTxt.text = e.toString();
        this.costTxt.text = c.toString();
    }

    createViews(){
        this.background = ViewFactory.makeRect(this.scene, this.color, this.size, this.size);
        // this.startTxt = ViewFactory.makeText(this.scene, '0', "#229922", 16, "left");
        // this.endTxt = ViewFactory.makeText(this.scene, '0', "#666666", 16, "right");
        this.costTxt = ViewFactory.makeText(this.scene, '0', "#ff0000", 32, "center");

        this.wall = ViewFactory.makeImage(this.scene, 'wall');

        this.add(this.background);
        // this.add(this.startTxt);
        // this.add(this.endTxt);
        this.add(this.costTxt);
        // this.add(this.wall);
        this.wall.visible = false;
        

        // this.startTxt.x = 12;
        // this.startTxt.y = this.size - 16;

        // this.endTxt.x = this.size - 12;
        // this.endTxt.y = this.size - 16;

        this.costTxt.x = this.size / 2;
        this.costTxt.y = this.size / 2;

        this.wall.scale = this.size / this.wall.width;
    }
}