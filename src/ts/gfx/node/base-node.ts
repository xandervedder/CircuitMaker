import { Drawable } from "../../gfx/drawable";
import { BaseNodeLogic } from "../../logic/node/base-node-logic";
import { Position } from "../../type/types";

const color = {
  on: "#ff0",
  off: "#000",
};

export abstract class BaseNode extends Drawable {
  constructor(
    x: number,
    y:  number,
    protected _radius: number,
    protected _nodeLogic: BaseNodeLogic,
  ) {
    super(x, y);
  }

  public get logic(): BaseNodeLogic {
    return this._nodeLogic;
  }

  public middlePoint(event: MouseEvent): Position {
    return {
      x: event.offsetX,
      y: event.offsetY,
    };
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this._nodeLogic.signal ? color.on : color.off;
    ctx.fill(this.path);
  }

  private get path(): Path2D {
    let path = new Path2D();
    path.arc(this._x, this._y, this._radius, 0, 2 * Math.PI);
    return path;
  }

  public drawableInPoint(position: Position): Drawable {
    if (this.pointInArea(position.x, position.y)) {
      return this;
    }
    return null;
  }

  public pointInArea(x: number, y: number): boolean {
    return (x - this._x) ** 2 + (y - this._y) ** 2 < this._radius ** 2;
  }

  public abstract onClick(event: MouseEvent): void;

  public send(): void {
    this._nodeLogic.send();
  }

  public recieve(signal: boolean): void {
    this._nodeLogic.recieve(signal);
  }
}
