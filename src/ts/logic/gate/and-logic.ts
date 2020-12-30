import { GateLogic } from "./gate-logic";
import { NandLogic } from "./nand-logic";

export class AndLogic extends NandLogic {
  protected _listen(): void {
    this._leftNode1.listener = { onSend: () => this.calculateOutput() };
    this._leftNode2.listener = { onSend: () => this.calculateOutput() };
  }

  public calculateOutput(): void {
    if (this._leftNode1.signal && this._leftNode2.signal)
      this._rightNode.recieve(true);
    else
      this._rightNode.recieve(false);
  }
}