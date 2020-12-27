import { BaseNodeLogic } from "../node/base-node-logic";

export class CableLogic {
  constructor(
    private _signal: boolean,
    private _beginNodeLogic: BaseNodeLogic,
    private _endLogics: BaseNodeLogic[],
  ) {
    this._beginNodeLogic.cable = this;
  }

  get left(): BaseNodeLogic {
    return this._beginNodeLogic;
  }

  get right(): BaseNodeLogic {
    return this._endLogics[0];
  }

  get signal(): boolean {
    return this._signal;
  }

  public sendPulse(signal: boolean): void {
    this._signal = signal;
    this._endLogics.forEach(logic => logic.recieve(signal));
  }
}
