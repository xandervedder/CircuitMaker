import { Drawable } from "../gfx/drawable";
import { DrawLayer } from "./draw-layer";
import { Layer } from "./layer";
import { PreviewLayer } from "./preview-layer";

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

    this._drawLayer.start();
    this._previewLayer.start()
  }

  public get activeLayer(): LayerType {
    return this._drawLayer.enabled ? LayerType.Draw : LayerType.Preview;
  }

  public get allDrawables(): Drawable[] {
    return [...this._drawLayer.drawables, ...this._previewLayer.drawables];
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

  private _restartDrawing(): void {
    // Kickstart drawing of both of these layers again
    this._drawLayer.draw();
    this._previewLayer.draw();
  }

  public transferDrawables(layer: LayerType = LayerType.Preview): void {
    switch (layer) {
      case LayerType.Draw: {
        this._previewLayer.addDrawables(this._drawLayer.drawables);
        this._drawLayer.clearDrawables();
        this._previewLayer.draw();
      } break;
      case LayerType.Preview: {
        this._drawLayer.addDrawables(this._previewLayer.drawables);
        this._previewLayer.clearDrawables();
        this._drawLayer.draw();
      } break;
    }
  }

  public clearDrawables(layer: LayerType = this.activeLayer): void {
    switch(layer) {
      case LayerType.Draw: {
        this._drawLayer.clearDrawables();
      } break;
      case LayerType.Preview: {
        this._previewLayer.clearDrawables();
      } break;
    }
  } 
}
