import { Drawable } from "../gfx/drawable";
import { And } from "../gfx/gate/and";
import { Nand } from "../gfx/gate/nand";
import { Not } from "../gfx/gate/not";
import { Or } from "../gfx/gate/or";
import { Xor } from "../gfx/gate/xor";
import { InputNode } from "../gfx/node/input-node";
import { InputOutputNode } from "../gfx/node/input-output-node";
import { OutputNode } from "../gfx/node/output-node";
import { Layer } from "../layer/layer";
import { Handler } from "./handler";

type Args = {
  and:  [ x: number, y: number                 ],
  nand: [ x: number, y: number                 ],
  node: [ x: number, y: number, radius: number ],
  not:  [ x: number, y: number                 ],
  or:   [ x: number, y: number                 ],
  xor:  [ x: number, y: number                 ],
};

const defaultArguments: Args = {
  and:  [ -250, -250,    ], 
  nand: [ -250, -250,    ],
  node: [ -250, -250, 25 ],
  not:  [ -250, -250,    ],
  or:   [ -250, -250,    ],
  xor:  [ -250, -250,    ],
};

const enum Type {
  And,
  InputNode,
  InputOutputNode,
  Nand,
  Not,
  OutputNode,
  Or,
  Xor,
};

type SelectorType = {
  selector: string,
  type: Type,
}

const factory = (type: Type): Drawable => {
  switch(type) {
    case Type.And:
      return new And(...defaultArguments.and);
    case Type.Nand:
      return new Nand(...defaultArguments.nand);
    case Type.InputNode:
      return new InputNode(...defaultArguments.node);
    case Type.InputOutputNode:
        return new InputOutputNode(...defaultArguments.node);
    case Type.Not:
      return new Not(...defaultArguments.not);
    case Type.OutputNode:
      return new OutputNode(...defaultArguments.node);
    case Type.Or:
      return new Or(...defaultArguments.or); 
    case Type.Xor:
      return new Xor(...defaultArguments.xor);
  }
};

export const elements: SelectorType[] = [
  { selector: "#and",         type: Type.And,            },
  { selector: "#input",       type: Type.InputNode,      },
  { selector: "#inputOutput", type: Type.InputOutputNode },
  { selector: "#nand",        type: Type.Nand            },
  { selector: "#not",         type: Type.Not             },
  { selector: "#output",      type: Type.OutputNode      },
  { selector: "#or",          type: Type.Or              },
  { selector: "#xor",         type: Type.Xor             },
];

export class DrawablePlacer extends Handler {
  private _currentDrawable: Drawable;
  private _currentType: Type;

  constructor(layer: Layer) {
    super(layer);
    
    this._currentType = Type.Nand;
    this._currentDrawable = factory(this._currentType);
    this._layer.addDrawable(this._currentDrawable);

    elements.forEach(element => {
      document
        .querySelector(element.selector)
        .addEventListener("click", () => this._handleEvent(element.type));
    });
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
