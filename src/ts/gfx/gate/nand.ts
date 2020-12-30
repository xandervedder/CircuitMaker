import { Drawable } from "../drawable";
import { InputOutputNode } from "../node/input-output-node";
import { NandLogic } from "../../logic/gate/nand-logic";
import { Position } from "../../type/types";

export class Nand extends Drawable {
  private _height: number;
  private _width: number;
  private _qSize: number;

  private _leftNode1: InputOutputNode;
  private _leftNode2: InputOutputNode;
  private _rightNode: InputOutputNode;

  private _nandLogic: NandLogic;

  constructor(x: number, y: number) {
    super(x ,y);

    this._height = 150;
    this._width = 150;
    this._qSize = this._height / 4;

    this._setUpNodes();
  }

  private _setUpNodes(): void {
    this._leftNode1 = new InputOutputNode(this._x, this._y + this._qSize, 10);
    this._leftNode2 = new InputOutputNode(this._x, this._y + this._qSize * 3, 10);
    this._rightNode = new InputOutputNode(this._x + this._width, this._y + this._qSize * 2, 10);
    
    this._nandLogic = new NandLogic(this._leftNode1.logic, this._leftNode2.logic, this._rightNode.logic);
    this._nandLogic.listen();
  }

  public middlePoint(event: MouseEvent): Position {
    return {
      x: event.offsetX - this._width / 2,
      y: event.offsetY - this._height / 2,
    };
  }

  public set position(position: Position) {
    this._x = position.x;
    this._y = position.y;

    this._leftNode1.position = { x: position.x, y: position.y + this._qSize };
    this._leftNode2.position = { x: position.x, y: position.y + this._qSize * 3 };
    this._rightNode.position = { x: position.x + this._width, y: position.y + this._qSize * 2 };
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "#0f0";
    ctx.fillRect(this._x, this._y, this._width, this._height);

    this._leftNode1.draw(ctx);
    this._leftNode2.draw(ctx);
    this._rightNode.draw(ctx);
  }

  public drawableInPoint(position: Position): Drawable {
    return [this._leftNode1, this._leftNode2, this._rightNode].filter(node => node.pointInArea(position.x, position.y))[0];
  }

  public onClick(event: Position): void {}

  public pointInArea(x: number, y: number): boolean {
    return [this._leftNode1, this._leftNode2, this._rightNode].filter(node => node.pointInArea(x, y)).length !== 0;
  }
}
