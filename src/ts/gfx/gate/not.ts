import { NotLogic } from "../../logic/gate/not-logic";
import { Position } from "../../type/types";
import { Drawable } from "../drawable";
import { BaseNode } from "../node/base-node";
import { InputOutputNode } from "../node/input-output-node";
import { triangle } from "../util/draw";
import { pXY } from "../util/position";

export class Not extends Drawable {
  private _height: number;
  private _width: number;
  private _middle: number;

  private _leftNode: BaseNode;
  private _rightNode: BaseNode;

  private _notLogic: NotLogic;

  constructor(x: number, y: number) {
    super(x, y);

    this._height = 150;
    this._width = 150;
    this._middle = this._height / 2;

    this._leftNode = new InputOutputNode(x, y + this._middle, 10);
    this._rightNode = new InputOutputNode(x + this._width, y + this._middle, 10);

    this._notLogic = new NotLogic(this._leftNode.logic, this._rightNode.logic);
  }

  public set position(position: Position) {
    this._x = position.x;
    this._y = position.y;

    this._leftNode.position = pXY(position.x, position.y + this._middle);
    this._rightNode.position = pXY(position.x + this._width, position.y + this._middle);
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    triangle(
      ctx, 
      pXY(this._x, this._y),
      pXY(this._x + this._width, this._y + (this._height / 2)),
      pXY(this._x, this._y + this._height),
    );

    this._leftNode.draw(ctx);
    this._rightNode.draw(ctx);
  }

  public drawableInPoint(position: Position): Drawable {
    return [this._leftNode, this._rightNode].filter(node => node.pointInArea(position.x, position.y))[0];
  }

  public middlePoint(event: MouseEvent): Position {
    return pXY(event.offsetX - this._width / 2, event.offsetY - this._height / 2);
  }

  public onClick(event: Position): void {}

  public pointInArea(x: number, y: number): boolean {
    return this._leftNode.pointInArea(x, y) || this._rightNode.pointInArea(x, y);
  }
}
