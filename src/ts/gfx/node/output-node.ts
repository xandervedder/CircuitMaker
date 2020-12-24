import { OutputNodeLogic } from "../../logic/node/output-node-logic.js";
import { BaseNode } from "./base-node.js";

export class OutputNode extends BaseNode {
  constructor(x: number, y: number, radius: number) {
    super(x, y, radius, new OutputNodeLogic())
  }

  public onClick(event: MouseEvent): void {
    this._nodeLogic.reverseSignal();
    this.send();
  }
}