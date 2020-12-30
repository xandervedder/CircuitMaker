import { XorLogic } from "../../logic/gate/xor-logic";
import { Or } from "./or";

export class Xor extends Or {
  constructor(x: number, y: number) {
    super(x, y);

    this._color = "purple";
    this._logic = new XorLogic(this._leftNode1.logic, this._leftNode2.logic, this._rightNode.logic);
  }
}
