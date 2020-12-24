import { Circuit } from "./circuit.js";
import { Drawable } from "./gfx/drawable.js";
import { BaseNode } from "./gfx/node/base-node.js";
import { Position } from "./type/types.js";
import { translate } from "./util/util.js";
import { CableLogic } from "./logic/cable/cable.js";

// Will be reworked in #3
export class CableHandler {
  private _circuit: Circuit;
  private _ctx: CanvasRenderingContext2D;

  private _dragging: boolean = false;
  private _mouseDown: boolean = false;

  private _mouseDownPosition: Position = null;
  private _mouseUpPosition: Position = null;
  private _mouseMovePosition: Position = null;

  private _leftNode: BaseNode = null;
  private _rightNode: BaseNode = null;
  private _cables: Cable[] = [];

  constructor(circuit: Circuit, ctx: CanvasRenderingContext2D) {
    this._circuit = circuit;
    this._ctx = ctx;

    this._setUpListeners();
  }

  private _setUpListeners() {
    const canvas = this._circuit.canvas;
    canvas.addEventListener("mousedown", (event) => {
      this._handleMouseDown(translate(event));
    });
    canvas.addEventListener("mousemove", (event) => {
      this._handleMouseMove(translate(event));
    });
    canvas.addEventListener("mouseup", (event) => {
      this._handleMouseUp(translate(event));
    });
  }

  private _handleMouseDown(event: Position): void {
    this._mouseDownPosition = event;
    this._mouseDown = true;

    for (let drawable of Drawable.drawables) {
      if (drawable.pointInArea(event.x, event.y) && drawable instanceof BaseNode) {
        this._leftNode = drawable;
        break;
      }
    }
  }

  private _handleMouseMove(event: Position): void {
    this._mouseMovePosition = event;
    if (this._mouseDown) this._dragging = true;
    else this._dragging = false;
  }   

  private _handleMouseUp(event: Position): void {
    this._mouseUpPosition = event;

    // if (!this._dragging) return;

    for (let drawable of Drawable.drawables) {
      if (
        drawable.pointInArea(event.x, event.y) &&
        this._dragging &&
        drawable instanceof BaseNode
      ) {
        if (drawable.logic.occupied)
          return;
        
        this._rightNode = drawable;
        let cable = new Cable(this._leftNode, this._rightNode);
        this._leftNode.logic.cable = cable;
        this._cables.push(cable);
        break;
      }
    }

    this._mouseDown = false;
    this._dragging = false;
  }

  draw(): void {
    if (!this._dragging) return;

    this._drawCable(
      this._mouseDownPosition.x,
      this._mouseDownPosition.y,
      this._mouseMovePosition.x,
      this._mouseMovePosition.y
    );
  }

  _drawCable(sX: number, sY: number, eX: number, eY: number): void {
    this._ctx.beginPath();
    this._ctx.lineWidth = 3;
    this._ctx.moveTo(sX, sY);
    this._ctx.lineTo(eX, eY);
    this._ctx.stroke();
  }
}

export class Cable extends Drawable {
  private _cableLogic: CableLogic;

  constructor(
    private _leftNode: BaseNode,
    private _rightNode: BaseNode,
  ) {
    super();

    this._cableLogic = new CableLogic(false, _leftNode.logic, _rightNode.logic);
  }

  public get left(): BaseNode {
    return this._leftNode;
  }

  public get right(): BaseNode {
    return this._rightNode;
  }

  public get logic(): CableLogic {
    return this._cableLogic;
  }

  public sendPulse(signal: boolean): void {
    this._cableLogic.sendPulse(signal);
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.moveTo(this.left.position.x, this.left.position.y);
    ctx.lineTo(this.right.position.x, this.right.position.y);
    ctx.stroke();
  }

  public onClick(event: Position): void {
    // Not yet
  }

  public pointInArea(x: number, y: number): boolean {
    return false;
  }
}
