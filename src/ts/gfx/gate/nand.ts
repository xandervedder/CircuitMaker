import { Drawable } from "../drawable.js";
import { InputOutputNode } from "../node/input-output-node.js";
import { NandLogic } from "../../logic/gate/nand-logic.js";
import { Position } from "../../type/types.js";

export class Nand extends Drawable {
  private _height: number;
  private _width: number;
  private _qSize: number;

  private _leftNode1: InputOutputNode;
  private _leftNode2: InputOutputNode;
  private _rightNode: InputOutputNode;

  constructor(private _x: number, private _y: number) {
    super();

    this._height = 250;
    this._width = 250;
    this._qSize = this._height / 4;

    this._setUpNodes();
  }

  private _setUpNodes(): void {
    this._leftNode1 = new InputOutputNode(this._x, this._y + this._qSize, 20);
    this._leftNode2 = new InputOutputNode(this._x, this._y + this._qSize * 3, 20);
    this._rightNode = new InputOutputNode(this._x + this._width, this._y + this._qSize * 2, 20);
    
    const nandLogic = new NandLogic(this._leftNode1.logic, this._leftNode2.logic, this._rightNode.logic);
    nandLogic.listen();
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "#0f0";
    ctx.rect(this._x, this._y, this._width, this._height);
    ctx.fill();

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
