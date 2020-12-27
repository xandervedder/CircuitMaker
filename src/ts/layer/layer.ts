import { Drawable } from "../gfx/drawable";
import { LayerManager } from "./layer-manager";

export abstract class Layer {
  protected _container: HTMLDivElement;
  protected _ctx: CanvasRenderingContext2D;
  protected _drawables: Drawable[] = [];
  protected _enabled: boolean;

  constructor(
    protected _internalCanvas: HTMLCanvasElement,
    protected _manager: LayerManager,
  ) {
    this._container = document.querySelector("#container");
    this._ctx = this._internalCanvas.getContext("2d");

    // By default this should be true, it enables the layer to repaint itself.
    this._enabled = true;

    window.addEventListener("resize", () => this._resizeCanvas());
    this._resizeCanvas();
  }

  public get canvas() {
    return this._internalCanvas;
  }

  public get height() {
    return this._internalCanvas.height;
  }

  public get width() {
    return this._internalCanvas.width;
  }

  public get enabled() {
    return this._enabled;
  }

  public get drawables() {
    return this._drawables;
  }

  public get manager() {
    return this._manager;
  }

  public addDrawable(drawable: Drawable): void {
    this._drawables.push(drawable);
  }

  public addDrawables(drawables: Drawable[]): void {
    drawables.forEach(drawable => this._drawables.push(drawable));
  }

  public clearDrawables() {
    this._drawables = [];
  }

  public removeLastDrawable() {
    this._drawables.pop();
  }

  public enable(): void {
    this._enabled = true;
  }

  public disable(): void {
    this._enabled = false;
  }

  private _resizeCanvas(): void {
    this._internalCanvas.height = this._container.getBoundingClientRect().height;
    this._internalCanvas.width = this._container.getBoundingClientRect().width;
  }

  public abstract start(): void;
  public abstract draw(): void;
}
