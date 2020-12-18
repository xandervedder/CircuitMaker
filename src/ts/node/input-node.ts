import { BaseNode } from "./base-node.js";

export class InputNode extends BaseNode {
  constructor(x: number, y: number, radius: number) {
    super(x, y, radius);
  }

  /**
   * Stays blank since we don't want to change anything onclick.
   */
  onClick(event: MouseEvent): void {}

  /**
   * Stays blank since we shouldn't be able to send signals.
   */
  send(): void {}

  recieve(signal: boolean): void {
    this._signal = signal;
  }
}
