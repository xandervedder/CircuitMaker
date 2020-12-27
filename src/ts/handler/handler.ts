import { Layer } from "../layer/layer";

export abstract class Handler {
  constructor(protected _layer: Layer) {}

  public abstract onMouseMove(event: MouseEvent): void;
  public abstract onMouseDown(event: MouseEvent): void;
  public abstract onMouseUp(event: MouseEvent): void;
  public abstract onMouseButtonRight(event: MouseEvent): void;
}
