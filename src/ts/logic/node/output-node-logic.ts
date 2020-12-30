import { BaseNodeLogic } from "./base-node-logic";

export class OutputNodeLogic extends BaseNodeLogic {
  public recieve(signal: boolean) {}
  
  public send() {
    super.send();

    this._cable?.sendPulse(this._signal);
  }
}
