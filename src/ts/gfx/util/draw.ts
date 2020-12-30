import { Position } from "../../type/types";

export function circle(
  ctx: CanvasRenderingContext2D,
  position: Position,
  radius: number,
): void {
  let path = new Path2D();
  path.arc(
    position.x,
    position.y,
    radius,
    0, 
    2 * Math.PI,
  );
  ctx.fill(path);
}

export function curvedShape(
  ctx: CanvasRenderingContext2D,
  begin: Position,
  control: Position,
  end: Position,
): void {
  ctx.beginPath();
  ctx.moveTo(begin.x, begin.y);
  ctx.quadraticCurveTo(control.x, control.y, end.x, end.y);
  ctx.fill();
}

export function line(
  ctx: CanvasRenderingContext2D,
  begin: Position, 
  end: Position, 
  lineWidth: number = 3
): void {
  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.moveTo(begin.x, begin.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
}

export function triangle(
  ctx: CanvasRenderingContext2D,
  start: Position,
  middle: Position,
  end: Position,
): void {
  ctx.beginPath();
  ctx.fillStyle = "#f00";
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(middle.x, middle.y);
  ctx.lineTo(end.x, end.y);
  ctx.fill();
}
