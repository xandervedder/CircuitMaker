import { BaseNodeLogic } from "./base-node-logic.js";

export class InputOutputNodeLogic extends BaseNodeLogic {
  public send(): void {
    super.send();

    this._cable?.sendPulse(this._signal);
  }

  public recieve(signal: boolean): void {
    super.recieve(signal);
    
    this._signal = signal;
    this.send();
  }
}
