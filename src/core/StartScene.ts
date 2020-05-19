import * as Phaser from 'phaser';
import listener from "./listener.js";
import { MapView } from './MapView';
import { MapData } from './MapData';
import { Point } from './Point';

export class StartScene extends Phaser.Scene {
    stage: Phaser.GameObjects.Polygon;
    stageWidth: number;
    stageHeight: number;
    stageColor: number = 0xffffff;
    stageScale: number = 1;
    stageX: number = 0;
    stageY: number = 0;
    centerX: number = 0;
    centerY: number = 0;
    container: Phaser.GameObjects.Container;
    curView: any;
    sx: number = 0;
    sy: number = 0;
    drawing: boolean = false;
    rects: any[] = [];
    center: any = {};
    offset: any = {};
    size: number = 750 / 9;
    mapView: MapView;
    clickType: number = MapData.TYPE_FREE;

    constructor() {
        super({
            key: 'StartScene'
        })
    }

    init(params: any): void {

    }

    preload(): void {
        // this.load.setBaseURL('http://labs.phaser.io');
        // this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    }

    create(): void {
        this.stageWidth = Number(this.game.config.width);
        this.stageHeight = Number(this.game.config.height);
        this.container = this.add.container(0, 0);

        this.mapView = new MapView(this, this.stageWidth, this.stageHeight, this.size);
        this.container.add(this.mapView);

        this.addEvent();
    }

    addEvent() {
        listener.on("next", () => {
            
        });

        listener.on("reset", () => {
            this.clickType = MapData.TYPE_FREE;
            this.container.x = 0;
            this.container.y = 0;
            this.container.scale = 1;
            this.mapView.reset();
        });
    }

    drawStart(pointer: any) {
        this.drawing = true;
        this.updateDrawView(pointer.downX, pointer.downY);
    }

    drawUpdate(pointer: any) {
        if (this.drawing) {
            this.updateDrawView(pointer.worldX, pointer.worldY);
        }
    }

    drawStop(pointer: any) {
        this.drawing = false;
        console.log(pointer, "drawStop");
    }

    updateDrawView(x: number, y: number) {
        var p = this.worldToContainer(x, y)
        var col = Math.floor(p.x / this.size);
        var row = Math.floor(p.y / this.size);
        this.mapView.changeType(row, col, this.clickType);
    }

    worldToContainer(x: number, y: number) {
        return {
            x: (x - this.container.x) / this.container.scale,
            y: (y - this.container.y) / this.container.scale
        }
    }

    update(time: any): void {

    }
}