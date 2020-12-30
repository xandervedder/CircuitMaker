import { Position } from "../../type/types";

export function p(event: MouseEvent): Position {
  return {
    x: event.offsetX,
    y: event.offsetY,
  }
}

export function pXY(x: number, y: number): Position {
  return {
    x: x,
    y: y,
  }
}
