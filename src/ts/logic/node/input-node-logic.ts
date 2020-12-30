import { BaseNodeLogic } from "./base-node-logic";

export class InputNodeLogic extends BaseNodeLogic {
  public recieve(signal: boolean): void {
    this._signal = signal;
  }
}
