export class Point{
  
  col:number;//第几列
  row:number;//第几行
  
  parent:Point;

  toStart:number = 0;//到起点的代价
  toEnd:number = 0;//到终点的代价
  cost:number = 0;//估值

  type:number = 1;
  
  constructor(row:number, col:number){
    this.row = row;
    this.col = col;
  }

}