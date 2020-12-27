import { Drawable } from "../gfx/drawable.js";
import { Nand } from "../gfx/gate/nand.js";
import { InputNode } from "../gfx/node/input-node.js";
import { OutputNode } from "../gfx/node/output-node.js";
import { Layer } from "./layer.js";
import { LayerManager } from "./layer-manager.js";

const DRAW_LAYER_ID = "#drawLayer";

export class DrawLayer extends Layer {
  constructor(manager: LayerManager) {
    super(document.querySelector(DRAW_LAYER_ID), manager);
    
    this._drawables.push(new OutputNode(250, 475, 25));
    this._drawables.push(new Nand(500, 350));
    this._drawables.push(new InputNode(1000, 475, 25));
    this._drawables.push(new InputNode(1000, 275, 25));

    this._addEvents();
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
