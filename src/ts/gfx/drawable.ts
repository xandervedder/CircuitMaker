import { Position } from "../type/types";

export abstract class Drawable {
  constructor(protected _x: number, protected _y: number) {}

  public get position(): Position {
    return {
      x: this._x,
      y: this._y,
    };
  }

  public set position(position: Position) {
    this._x = position.x;
    this._y = position.y;
  }

  public abstract draw(ctx: CanvasRenderingContext2D): void;
  public abstract drawableInPoint(position: Position): Drawable;
  public abstract middlePoint(event: MouseEvent): Position;
  public abstract onClick(event: Position): void;
  public abstract pointInArea(x: number, y: number): boolean;
}
