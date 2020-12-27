import { CableLogic } from "../../logic/cable/cable-logic.js";
import { Position } from "../../type/types.js";
import { Drawable } from "../drawable.js";
import { BaseNode } from "../node/base-node.js";
import { circle, line } from "../util/draw.js";

export class Cable extends Drawable {
  private _cableLogic: CableLogic;
  private _isSplit: boolean = false;
  private _splitPoint: Position;
  private _activeSplitPoint: Position;
  private _splitPoints: Position[] = [];

  constructor(private _beginPoint: Position, private _endPoint: Position) {
    super();
  }

  public get beginPoint(): Position {
    return this._beginPoint;
  }
  
  public set beginPoint(position: Position) {
    this._beginPoint = position;
  }
  
  public get endPoint(): Position {
    return this._endPoint;
  }
  
  public set endPoint(position: Position) {
    if (!this._isSplit)
    this._endPoint = position;
    
    this._activeSplitPoint = position;
  }
  
  public get isSplit(): boolean {
    return this._isSplit;
  }

  public get splitPoints(): Position[] {
    return this._splitPoints;
  }

  public set splitPoints(points: Position[]) {
    this._splitPoints = points;
  }

  public split(position: Position): void {
    this._isSplit = true;
    this._splitPoint = position;
  }

  public endSplitPoint(position: Position) {
    this._splitPoints.push(this._activeSplitPoint);
    this._activeSplitPoint = position;
  }

  public done() {
    this._activeSplitPoint = null;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    if (this._beginPoint === null || this._endPoint === null)
      return;

    // TODO: Make a util method for this
    ctx.fillStyle = this._cableLogic?.signal ? "#ff0" : "#000";
    ctx.strokeStyle = this._cableLogic?.signal ? "#ff0" : "#000";

    line(ctx, this._beginPoint, this._endPoint);

    if (!this._isSplit) 
      return;

    if (this._activeSplitPoint !== null)
      line(ctx, this._splitPoint, this._activeSplitPoint);

    this._splitPoints.forEach(point => {
      line(ctx, this._splitPoint, point);
    });

    // Draw the circle as last, to let it appear on top of the wires
    circle(ctx, this._splitPoint, 10);
  }

  public setUpLogic(beginNode: BaseNode, endNodes: BaseNode[]) {
    this._cableLogic = new CableLogic(false, beginNode.logic, endNodes.map(node => node.logic));
  }

  public drawableInPoint(position: Position): Drawable {
    return null;
  }

  public onClick(event: Position): void {}

  public pointInArea(x: number, y: number): boolean {
    return false; 
  }
}