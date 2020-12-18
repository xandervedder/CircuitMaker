import { BuildHandler } from "./build.js";
import { CableHandler } from "./cable.js";
import { Drawable } from "./gfx/drawable.js";
import { Position } from "./type/types.js";
import { translate } from "./util/util.js";

export class Circuit {
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;

  private _buildHandler: BuildHandler;
  private _cableHandler: CableHandler;

  // Constructor initialization: https://stackoverflow.com/a/42203990
  constructor() {
    this._canvas = document.querySelector("#canvas");
    this._canvas.height = window.innerHeight - 350;
    this._canvas.width = window.innerWidth - 50;
    this._ctx = this._canvas.getContext("2d");

    this._buildHandler = new BuildHandler(this, this._ctx);
    this._cableHandler = new CableHandler(this, this._ctx);

    this._setUpListeners();
  }

  private _setUpListeners() {
    this._canvas.addEventListener("click", (event) => this._handleClick(translate(event)));

    //document.querySelector("#clearCanvas").addEventListener("click", () => (this.drawables = []));

    window.addEventListener("resize", () => {
      this._canvas.height = window.innerHeight - 350;
      this._canvas.width = window.innerWidth - 50;
    });
  }

  get canvas() {
    return this._canvas;
  }

  get height() {
    return this._canvas.height;
  }

  get width() {
    return this._canvas.width;
  }

  start(): void {
    // TODO: In the future, load stuff here
    this._draw();
  }

  private _draw(): void {
    this._ctx.clearRect(0, 0, this.width, this.height);
    Drawable.drawables.forEach((drawable) => drawable.draw(this._ctx));

    this._cableHandler.draw();

    window.requestAnimationFrame(() => this._draw());
  }

  private _handleClick(event: Position): void {
    // There is an edge case here:
    // If there are two drawables overlapping, it will trigger both onclicks...
    for (let drawable of Drawable.drawables)
      if (drawable.pointInArea(event.x, event.y)) drawable.onClick(event);
  }
}
