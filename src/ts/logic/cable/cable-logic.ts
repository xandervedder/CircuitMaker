import { BaseNodeLogic } from "../node/base-node-logic";

export class CableLogic {
  constructor(
    private _signal: boolean,
    private _beginNodeLogic: BaseNodeLogic,
    private _endNodeLogics: BaseNodeLogic[],
  ) {
    this._endNodeLogics.forEach(node => {
      node.cable = this;
    });
  }

  get left(): BaseNodeLogic {
    return this._beginNodeLogic;
  }

  get right(): BaseNodeLogic {
    return this._endNodeLogics[0];
  }

  get signal(): boolean {
    return this._beginNodeLogic.signal;
  }

  public sendPulse(signal: boolean): void {
    this._signal = signal;
    this._endNodeLogics.forEach(logic => logic.recieve(signal));
  }
}
