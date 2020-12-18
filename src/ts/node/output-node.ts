import { BaseNode } from "./base-node.js";

export class OutputNode extends BaseNode {
  constructor(x: number, y: number, radius: number) {
    super(x, y, radius);
  }

  onClick(event: MouseEvent): void {
    this._signal = !this._signal;
    this.send();
  }

  send(): void {
    this._cable?.sendPulse(this._signal);
  }

  /**
   * Stays blank, since we don't want to recieve signals.
   */
  recieve(signal: boolean): void {}
}