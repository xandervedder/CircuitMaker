import { Cable } from "../cable.js";
import { Drawable } from "../gfx/drawable.js";
import { BaseNode } from "../node/base-node.js";
import { InputOutputNode } from "../node/input-output-node.js";
import { Position } from "../type/types.js";

// We really need to seperate logic from drawing.. It's already getting messy
class SignalConverter extends BaseNode {
  private _externalNodes: BaseNode[];
  private _cables: Cable[] = [];

  constructor(external: BaseNode[]) {
    super(0, 0, 0);

    this._externalNodes = external;
    this._signal = true;

    this._setUpCables();
  }

  private _setUpCables() {
    this._cables.push(new Cable(this._externalNodes[0], this));
    this._cables.push(new Cable(this._externalNodes[1], this));
    this._externalNodes[0].cable = this._cables[0];
    this._externalNodes[1].cable = this._cables[1];
  }

  onClick(event: MouseEvent): void {}

  send(): void {
    this._externalNodes[2].recieve(this._signal);
  }

  recieve(signal: boolean): void {
    if (!this._cables[0].signal && !this._cables[1].signal) this._signal = true;
    else this._signal = false;
    
    this.send();
  }
}

export class NAND extends Drawable {
  private _x: number;
  private _y: number;
  private _height: number;
  private _width: number;
  private _qSize: number;
  private _signalConverter: SignalConverter;

  constructor(x: number, y: number) {
    super();

    this._x = x;
    this._y = y;
    this._height = 250;
    this._width = 250;
    this._qSize = this._height / 4;

    this._setUpConverter();
  }

  private _setUpConverter(): void {
    this._signalConverter = new SignalConverter(
      [
        new InputOutputNode(this._x, this._y + this._qSize, 20),
        new InputOutputNode(this._x, this._y + this._qSize * 3, 20),
        new InputOutputNode(this._x + this._width, this._y + this._qSize * 2, 20),
      ]
    );
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "#0f0";
    ctx.rect(this._x, this._y, this._width, this._height);
    ctx.fill();
  }

  onClick(event: Position): void {}

  pointInArea(x: number, y: number): boolean {
    return false;
  }
}
