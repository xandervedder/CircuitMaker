import { Position } from "../type/types.js";

export abstract class Drawable {
  private static _drawables: Array<Drawable> = [];

  constructor() {
    Drawable._drawables.push(this);
  }

  static get drawables() {
    return Drawable._drawables;
  }

  public static clearAll() {
    Drawable._drawables = [];
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;
  abstract onClick(event: Position): void;
  abstract pointInArea(x: number, y: number): boolean;
}
