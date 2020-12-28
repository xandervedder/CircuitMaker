import { Position } from "../type/types";

export abstract class Drawable {
  public abstract draw(ctx: CanvasRenderingContext2D): void;
  public abstract drawableInPoint(position: Position): Drawable;
  public abstract onClick(event: Position): void;
  public abstract pointInArea(x: number, y: number): boolean;
}
