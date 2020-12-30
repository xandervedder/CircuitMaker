import { BaseNodeLogic } from "./base-node-logic";

export class InputOutputNodeLogic extends BaseNodeLogic {
  public recieve(signal: boolean): void {
    this._signal = signal;
  }
}
