import { AndLogic } from "../../logic/gate/and-logic";
import { Nand } from "./nand";

export class And extends Nand {
  constructor(x: number, y: number) {
    super(x, y);

    this._logic = new AndLogic(this._leftNode1.logic, this._leftNode2.logic, this._rightNode.logic);
    this._color = "#00f";
  }
}
