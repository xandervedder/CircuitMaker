// import { Circuit } from "../layer/circuit.js";
// import { Drawable } from "../gfx/drawable.js";
// import { BaseNode } from "../gfx/node/base-node.js";
// import { create, NodeType } from "../gfx/node/node-factory.js";
// import { Position } from "../type/types.js";

//* Will be reworked in #6

// const buttonModifier = "partPicker__button--selected";
// const buttons = document.querySelectorAll(".partPicker__button");

// export class BuildHandler {
//   private _circuit: Circuit;
//   private _ctx: CanvasRenderingContext2D;
//   private _node: BaseNode;
//   private _type: NodeType;

//   constructor(circuit: Circuit, ctx: CanvasRenderingContext2D) {
//     this._circuit = circuit;
//     this._ctx = ctx;
//     this._node = null;
//     this._type = null;

//     this._setUpListeners();
//   }

//   private _setUpListeners(): void {
//     this._circuit.canvas.addEventListener("click", (event) => {
//       this._handleCanvasClick(event);
//     });
//     this._circuit.canvas.addEventListener("mousemove", (event) => {
//       this._handleMouseMove(event);
//     });

//     document.querySelector("#inputNode").addEventListener("click", (event) => {
//       this._handleButtonclick(event, NodeType.Input);
//     });
//     document.querySelector("#inputOutputNode").addEventListener("click", (event) => {
//       this._handleButtonclick(event, NodeType.InputOutput);
//     });
//     document.querySelector("#outputNode").addEventListener("click", (event) => {
//       this._handleButtonclick(event, NodeType.Output);
//     });
//   }

//   private _handleCanvasClick(event: Position): void {
//     if (this._node) {
//       // Save position from click
//       this._node.position = event;
//       // Assign a new node, the previous one was already added.
//       this._node = create(this._type, -500, -500, 50);
//     }
//   }

//   private _handleMouseMove(event: Position): void {
//     if (this._node) this._node.position = event;
//   }

//   private _handleButtonclick(event: Event, type: NodeType): void {
//     this._type = type;

//     const target = <HTMLElement> event.target;

//     if (target.classList.contains(buttonModifier)) {
//       this._node = null;
//       Drawable.drawables.pop();
//       target.classList.remove(buttonModifier);
//       return;
//     }

//     this._node = create(type, -500, -500, 50);
//     target.classList.add(buttonModifier);
//     this._toggleOtherButtons(target);
//   }

//   private _toggleOtherButtons(currentButton: HTMLElement): void {
//     for (let button of buttons) {
//       if (button !== currentButton) {
//         button.classList.remove(buttonModifier);
//       }
//     }
//   }
// }
