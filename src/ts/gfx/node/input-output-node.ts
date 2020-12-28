import { InputOutputNodeLogic } from "../../logic/node/input-output-node-logic";
import { BaseNode } from "./base-node";

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
