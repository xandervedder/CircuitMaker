import { Position } from "../../type/types";

export function line(
  ctx: CanvasRenderingContext2D,
  begin: Position, 
  end: Position, 
  lineWidth: number = 3
) {
  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.moveTo(begin.x, begin.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
}

export function circle(
  ctx: CanvasRenderingContext2D,
  position: Position,
  radius: number,
) {
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
