import { CableLogic } from "../cable/cable-logic.js";

export interface Listener {
  onSend?: () => void;
  onRecieve?: (signal: boolean) => void;
}

export class BaseNodeLogic {
  protected _cable?: CableLogic;
  protected _listener?: Listener|null;
  protected _signal: boolean;

  constructor() {
    this._signal = false;
  }

  public send(): void { 
    this._listener?.onSend();
  }

  public recieve(signal: boolean): void {
    //this._listener?.onRecieve(signal);
  };

  public reverseSignal(): void {
    this._signal = !this._signal;
  }

  public set cable(cable: CableLogic) {
    this._cable = cable;
  }

  public get cable(): CableLogic {
    return this._cable;
  }

  public get signal(): boolean {
    return this._signal;
  }

  public set listener(listener: Listener) {
    this._listener = listener;
  }

  public get occupied() {
    return this._cable !== null && this._cable !== undefined;
  }
}
