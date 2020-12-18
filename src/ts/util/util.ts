import { Position } from "../type/types.js";

export function translate(event: MouseEvent): Position {
  return {
    x: event.x - 25,
    y: event.y - 25,
  };
}