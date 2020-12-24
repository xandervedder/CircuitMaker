import { BaseNodeLogic } from "./base-node-logic.js";

export class InputNodeLogic extends BaseNodeLogic {
  public recieve(signal: boolean): void {
    super.recieve(signal);

    this._signal = signal;
  }
}