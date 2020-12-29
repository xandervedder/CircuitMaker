import { InputNode } from "../gfx/node/input-node";
import { OutputNode } from "../gfx/node/output-node";
import { line } from "../gfx/util/draw";
import { Layer } from "./layer";
import { LayerManager } from "./layer-manager";

const DRAW_LAYER_ID = "#drawLayer";

export class DrawLayer extends Layer {
  constructor(manager: LayerManager) {
    super(document.querySelector(DRAW_LAYER_ID), manager);

    this._setUpStartingNodes();
    this._addEvents();
  }

  private _setUpStartingNodes() {
    // TODO: this should be configurable
    const nodeNumber = 4;
    const inputNodeNumber = nodeNumber / 2;

    for (let i = 0; i < nodeNumber; i++) {
      const distance = this.height / nodeNumber
      this.drawables.push(new OutputNode(0 + 35, (distance * i) + distance / 2, 25));
    }

    for (let i = 0; i < inputNodeNumber; i++) {
      const distance = this.height / inputNodeNumber
      this.drawables.push(new InputNode(this.width - 35, (distance * i) + distance / 2, 25));
    }
  }

  private _addEvents() {
    this._container.onclick = event => this._handleClick(event);
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

  private _handleClick(event: MouseEvent) {
    for (let drawable of this._drawables)
      if (drawable.pointInArea(event.offsetX, event.offsetY))
        drawable.onClick(event);
  }
}
