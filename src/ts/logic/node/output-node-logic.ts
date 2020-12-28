import { BaseNodeLogic } from "./base-node-logic";

export class OutputNodeLogic extends BaseNodeLogic {
  send() {
    super.send();

    this._cable?.sendPulse(this._signal);
  }
}