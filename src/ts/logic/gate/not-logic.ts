import { BaseNodeLogic } from "../node/base-node-logic";
import { GateLogic } from "./gate-logic";

export class NotLogic implements GateLogic {
  constructor(private _leftNode: BaseNodeLogic, private _rightNode: BaseNodeLogic) {
    this._listen();
    this._leftNode.shouldListen = true;
  }

  private _listen() {
    this._leftNode.listener = { onSend: () => this.calculateOutput() };
  }

  public calculateOutput(): void {
    this._rightNode.recieve(!this._leftNode.signal);
  }
}
