import { Drawable } from "../drawable.js";
import { InputOutputNode } from "../node/input-output-node.js";
import { NandLogic } from "../../logic/gate/nand-logic.js";
import { Position } from "../../type/types.js";

export class Nand extends Drawable {
  private _height: number;
  private _width: number;
  private _qSize: number;

  constructor(private _x: number, private _y: number) {
    super();

    this._height = 250;
    this._width = 250;
    this._qSize = this._height / 4;

    this._setUpNodes();
  }

  private _setUpNodes(): void {
    const leftNode1 = new InputOutputNode(this._x, this._y + this._qSize, 20);
    const leftNode2 = new InputOutputNode(this._x, this._y + this._qSize * 3, 20);
    const RightNode = new InputOutputNode(this._x + this._width, this._y + this._qSize * 2, 20);
    
    const nandLogic = new NandLogic(leftNode1.logic, leftNode2.logic, RightNode.logic);
    nandLogic.listen();
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "#0f0";
    ctx.rect(this._x, this._y, this._width, this._height);
    ctx.fill();
  }

  public onClick(event: Position): void {}

  public pointInArea(x: number, y: number): boolean {
    return false;
  }
}
