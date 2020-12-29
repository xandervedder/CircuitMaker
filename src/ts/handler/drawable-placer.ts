import { Drawable } from "../gfx/drawable";
import { Nand } from "../gfx/gate/nand";
import { InputNode } from "../gfx/node/input-node";
import { InputOutputNode } from "../gfx/node/input-output-node";
import { OutputNode } from "../gfx/node/output-node";
import { Layer } from "../layer/layer";
import { Handler } from "./handler";

type Args = {
  nand: [x: number, y: number],
  node: [x: number, y: number, radius: number]
};

const defaultArguments: Args = {
  nand: [-250, -250],
  node: [-250, -250, 25],
};

const enum Type {
  Nand,
  InputNode,
  InputOutputNode,
  OutputNode,
};

const factory = (type: Type): Drawable => {
  switch(type) {
    case Type.Nand:
      return new Nand(...defaultArguments.nand);
    case Type.InputNode:
      return new InputNode(...defaultArguments.node);
    case Type.InputOutputNode:
      return new InputOutputNode(...defaultArguments.node);
    case Type.OutputNode:
      return new OutputNode(...defaultArguments.node); 
  }
}

export class DrawablePlacer extends Handler {
  private _currentDrawable: Drawable;
  private _currentType: Type;

  constructor(layer: Layer) {
    super(layer);
    
    this._currentType = Type.Nand;
    this._currentDrawable = factory(this._currentType);
    this._layer.addDrawable(this._currentDrawable);

    document.querySelector("#nand").addEventListener("click", () => this._handleEvent(Type.Nand));
    document.querySelector("#input").addEventListener("click", () => this._handleEvent(Type.InputNode));
    document.querySelector("#inputOutput").addEventListener("click", () => this._handleEvent(Type.InputOutputNode));
    document.querySelector("#output").addEventListener("click", () => this._handleEvent(Type.OutputNode));
  }

  private _handleEvent(type: Type) {
    this._currentDrawable = factory(type);
    this._layer.addDrawable(this._currentDrawable);
    this._currentType = type;
  }

  public onMouseMove(event: MouseEvent): void {
    if (this._currentDrawable === null) return;

    this._currentDrawable.position = this._currentDrawable.middlePoint(event);
  }

  public onMouseDown(event: MouseEvent): void {
    if (event.button === 2) return;

    if (this._currentDrawable === null) { 
      this._createDrawable(event);
      return;
    }

    this._currentDrawable.position = this._currentDrawable.middlePoint(event);
    this._createDrawable(event);
  }

  _createDrawable(event: MouseEvent) {
    this._currentDrawable = factory(this._currentType);
    this._currentDrawable.position = this._currentDrawable.middlePoint(event);
    this._layer.addDrawable(this._currentDrawable);
  }

  public onMouseUp(event: MouseEvent): void {}

  public onMouseButtonRight(event: MouseEvent): void {
    this._layer.removeLastDrawable();
    this._currentDrawable = null;
  }
}
