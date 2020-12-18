import { Cable } from "../cable.js";
import { Drawable } from "../gfx/drawable.js";
import { Position } from "../type/types.js";

const color = {
  on: "#ff0",
  off: "#000",
};

export abstract class BaseNode extends Drawable {
  protected _x: number;
  protected _y: number;
  protected _radius: number;
  protected _cable: Cable | null;
  protected _signal: boolean;

  constructor(x: number, y: number, radius: number) {
    super();
    
    this._x = x;
    this._y = y;
    this._radius = radius;
    this._cable = null;
    this._signal = false;
  }

  set cable(cable: Cable) {
    this._cable = cable;
  }

  get position(): Position {
    return {
      x: this._x,
      y: this._y,
    };
  }

  set position(position: Position) {
    this._x = position.x;
    this._y = position.y;
  }

  private get path(): Path2D {
    let path = new Path2D();
    path.arc(this._x, this._y, this._radius, 0, 2 * Math.PI);
    return path;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this._signal ? color.on : color.off;
    ctx.fill(this.path);
  }

  pointInArea(x: number, y: number): boolean {
    return (x - this._x) ** 2 + (y - this._y) ** 2 < this._radius ** 2;
  }

  abstract onClick(event: MouseEvent): void;
  abstract send(): void;
  abstract recieve(signal: boolean): void;
}
