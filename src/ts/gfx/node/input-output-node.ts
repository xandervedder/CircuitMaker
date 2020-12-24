import { InputOutputNodeLogic } from "../../logic/node/input-output-node-logic.js";
import { BaseNode } from "./base-node.js";

export class InputOutputNode extends BaseNode {
  constructor(x: number, y: number, radius: number) {
    super(x, y, radius, new InputOutputNodeLogic());
  }

  /**
   * Stays blank, even though it is both an input and output node.
   * This is because the user themselves cannot turn this on or off.
   */
  onClick(event: MouseEvent): void {}
}
