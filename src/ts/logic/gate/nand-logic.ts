import { InputOutputNodeLogic } from "../node/input-output-node-logic";
import { GateLogic } from "./gate-logic";

export class NandLogic implements GateLogic {
  constructor(
    protected _leftNode1: InputOutputNodeLogic, 
    protected _leftNode2: InputOutputNodeLogic,
    protected _rightNode: InputOutputNodeLogic,
  ) {
    this._leftNode1.shouldListen = true;
    this._leftNode2.shouldListen = true;

    this._listen();
  }

  protected _listen(): void {
    this._leftNode1.listener = { onSend: () => this.calculateOutput() };
    this._leftNode2.listener = { onSend: () => this.calculateOutput() };
  }

  public calculateOutput(): void {
    if (this._leftNode1.signal && this._leftNode2.signal)
      this._rightNode.recieve(false);
    else
      this._rightNode.recieve(true);
  }
}
