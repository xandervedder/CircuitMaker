import { BaseNodeLogic } from "../node/base-node-logic";

export class CableLogic {
  constructor(
    private _signal: boolean,
    private _leftNodeLogic?: BaseNodeLogic,
    private _rightNodeLogic?: BaseNodeLogic,
  ) {}

  get left(): BaseNodeLogic {
    return this._leftNodeLogic;
  }

  get right(): BaseNodeLogic {
    return this._rightNodeLogic;
  }

  get signal(): boolean {
    return this._signal;
  }

  sendPulse(signal: boolean): void {
    this._signal = signal;
    this._rightNodeLogic?.recieve(signal);
  }
}
