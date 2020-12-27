import { Drawable } from "../gfx/drawable.js";
import { DrawLayer } from "./draw-layer.js";
import { Layer } from "./layer.js";
import { PreviewLayer } from "./preview-layer.js";

export enum LayerType {
  Draw,
  Preview,
}

export class LayerManager {
  private _drawLayer: Layer = new DrawLayer(this);
  private _previewLayer: Layer = new PreviewLayer(this);

  constructor() {
    this._drawLayer.disable();
    this._previewLayer.enable();

    //! NOTE: this should only be executed once
    this._drawLayer.start();
    this._previewLayer.start()
  }

  public get activeLayer() {
    return this._drawLayer.enabled ? LayerType.Draw : LayerType.Preview;
  }

  public getDrawablesByLayer(layer: LayerType): Drawable[] {
    if (layer === LayerType.Draw)
      return this._drawLayer.drawables;
    else
      return this._previewLayer.drawables;
  }

  public switchActiveLayer(layer: LayerType): void {
    switch (layer) {
      case LayerType.Draw: {
        this._drawLayer.enable();
        this._previewLayer.disable();
      } break;
      case LayerType.Preview: {
        this._drawLayer.disable();
        this._previewLayer.enable();
      } break;
    }
    this._restartDrawing();
  }

  private _restartDrawing() {
    // Kickstart drawing of both of these layers again
    this._drawLayer.draw();
    this._previewLayer.draw();
  }

  public transferDrawables(layer: LayerType = LayerType.Preview): void {
    switch (layer) {
      case LayerType.Draw: {
        this._previewLayer.addDrawables(this._drawLayer.drawables);
        this._drawLayer.clearDrawables();
      } break;
      case LayerType.Preview: {
        this._drawLayer.addDrawables(this._previewLayer.drawables);
        this._previewLayer.clearDrawables();
      } break;
    }
  }
}
