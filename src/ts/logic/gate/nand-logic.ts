import { InputOutputNodeLogic } from "../node/input-output-node-logic";

export class NandLogic {
  constructor(
    private _leftNode1: InputOutputNodeLogic, 
    private _leftNode2: InputOutputNodeLogic,
    private _rightNode: InputOutputNodeLogic,
  ) {}

  public listen(): void {
    this._leftNode1.listener = { onSend: () => this.calculateOutput() };
    this._leftNode2.listener = { onSend: () => this.calculateOutput() };
  }

  public calculateOutput(): void {
    if (!this._leftNode1.signal && !this._leftNode2.signal)
      this._rightNode.recieve(true);
    else
      this._rightNode.recieve(false);
  }
}
