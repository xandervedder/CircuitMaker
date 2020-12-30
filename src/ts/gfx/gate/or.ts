import { OrLogic } from "../../logic/gate/or-logic";
import { Position } from "../../type/types";
import { InputOutputNode } from "../node/input-output-node";
import { curvedShape } from "../util/draw";
import { pXY } from "../util/position";
import { Nand } from "./nand";

export class Or extends Nand {
  protected _leftNode1: InputOutputNode;
  protected _leftNode2: InputOutputNode;
  protected _rightNode: InputOutputNode;

  protected _height: number;
  protected _width: number;

  constructor(x: number, y: number) {
    super(x, y);

    this._color = "orange";
    this._logic = new OrLogic(this._leftNode1.logic, this._leftNode2.logic, this._rightNode.logic);
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this._color;
    curvedShape(
      ctx, 
      pXY(this._x, this._y),
      pXY(this._x + this._height * 2, this._y + this._width / 2),
      pXY(this._x, this._y + this._width)
    );

    this._leftNode1.draw(ctx);
    this._leftNode2.draw(ctx);
    this._rightNode.draw(ctx);
  }
}
