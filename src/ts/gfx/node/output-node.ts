import { OutputNodeLogic } from "../../logic/node/output-node-logic";
import { BaseNode } from "./base-node";

export class OutputNode extends BaseNode {
  constructor(x: number, y: number, radius: number) {
    super(x, y, radius, new OutputNodeLogic())
  }

  public onClick(event: MouseEvent): void {
    this._nodeLogic.reverseSignal();
    this.send();
  }
}
