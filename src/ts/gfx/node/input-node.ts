import { InputNodeLogic } from "../../logic/node/input-node-logic";
import { BaseNode } from "./base-node";

export class InputNode extends BaseNode {
  constructor(x: number, y: number, radius: number) {
    super(x, y, radius, new InputNodeLogic());
  }

  /**
   * Stays blank since we don't want to change anything onclick.
   */
  onClick(event: MouseEvent): void { }
}
