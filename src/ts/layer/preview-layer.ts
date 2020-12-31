import { CableHandler } from "../handler/cable-handler";
import { DrawablePlacer, elements } from "../handler/drawable-placer";
import { Handler } from "../handler/handler";
import { Layer } from "./layer";
import { LayerManager } from "./layer-manager";

const PREVIEW_LAYER_ID = "#previewLayer";

export class PreviewLayer extends Layer {
  private _cableHandler: Handler;
  private _drawablePlacer: Handler;

  private _handler: Handler;

  constructor(manager: LayerManager) {
    super(document.querySelector(PREVIEW_LAYER_ID), manager);

    this._cableHandler = new CableHandler(this);
    this._drawablePlacer = new DrawablePlacer(this);
    this._handler = this._drawablePlacer;

    this._addEvents();
  }

  private _addEvents() {
    this._container.onmousemove = event => this._handler.onMouseMove(event);
    this._container.onmousedown = event => this._handler.onMouseDown(event);
    this._container.onmouseup = event => this._handler.onMouseUp(event);
    this._container.oncontextmenu = event => {
      // We don't want to show the contextmenu.
      event.preventDefault();
      this._handler.onMouseButtonRight(event);
    }

    document.querySelector("#cable").addEventListener("click", () => {
      this._handler = this._cableHandler;
    });

    elements.forEach(element => {
      document.querySelector(element.selector).addEventListener("click", () => {
        this._handler = this._drawablePlacer;
      });
    });
  }

  public enable() {
    super.enable();

    this._addEvents();
  }

  public disable() {
    super.disable();

    this._container.onmousemove = null;
    this._container.onmousedown = null;
    this._container.onmouseup = null;
  }

  public start(): void {
    this.draw();
  }
  
  public draw(): void {
    this._ctx.clearRect(0, 0, this.width, this.height);
    this._drawables.forEach(drawable => {
      drawable.draw(this._ctx);
    });

    if (!this._enabled)
      return;

    window.requestAnimationFrame(() => this.draw());
  }
}
