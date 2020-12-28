import { BaseNode } from "./base-node";
import { InputNode } from "./input-node";
import { InputOutputNode } from "./input-output-node";
import { OutputNode } from "./output-node";

export enum NodeType {
  Input,
  InputOutput,
  Output,
};

export function create(type: NodeType, x: number, y: number, radius: number): BaseNode {
  switch (type) {
    case NodeType.Input:
      return new InputNode(x, y, radius);
    case NodeType.InputOutput:
      return new InputOutputNode(x, y, radius);
    case NodeType.Output:
      return new OutputNode(x, y, radius);
  }
}
