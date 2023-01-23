import { Point } from "@nut-tree/nut-js";

export function getSquarePoints(x: number, y: number, width: number) {
  return [
    new Point(x, y),
    new Point(x + width, y),
    new Point(x + width, y + width),
    new Point(x, y + width),
    new Point(x, y),
  ];
}

export function getRectanglePoints(
  x: number,
  y: number,
  width: number,
  length: number
): Point[] {
  return [
    new Point(x, y),
    new Point(x + length, y),
    new Point(x + length, y + width),
    new Point(x, y + width),
    new Point(x, y),
  ];
}

export function getCirclePoints(
  x: number,
  y: number,
  radius: number,
  step = 0.1
) {
  const path = [];
  for (let th = 0; th < 2 * Math.PI; th += step) {
    const _x = x + radius * Math.cos(th);
    const _y = y - radius * Math.sin(th);
    path.push(new Point(_x, _y));
  }
  return path;
}
