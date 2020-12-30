import { CableLogic } from "../cable/cable-logic";

export interface Listener {
  onSend?: () => void;
}

export abstract class BaseNodeLogic {
  protected _cable?: CableLogic;
  protected _listener?: Listener|null;
  protected _signal: boolean;

  protected _shouldListen: boolean = false;
  protected _shouldRecieve: boolean = false;

  constructor() {
    this._signal = false;
  }

  public send(): void { 
    this._listener?.onSend();
  }

  public abstract recieve(signal: boolean): void;

  public reverseSignal(): void {
    this._signal = !this._signal;
  }

  public set cable(cable: CableLogic) {
    this._cable = cable;
  }

  public get cable(): CableLogic {
    return this._cable;
  }
  
  public set listener(listener: Listener) {
    this._listener = listener;
  }

  public get signal(): boolean {
    if (this._cable) {
      if (this._cable.signal !== this._signal && this._shouldListen) {
        this._signal = this._cable.signal;
        this._listener?.onSend();
        return this._signal;
      }
      return this._cable.signal;
    }
    return this._signal;
  }

  public set shouldListen(value: boolean) {
    this._shouldListen = value;
  }

  public set shouldRecieve(value: boolean) {
    this._shouldRecieve = value;
  }

  public get occupied() {
    return this._cable !== null && this._cable !== undefined;
  }
}
