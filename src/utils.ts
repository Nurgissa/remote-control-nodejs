import { Button, mouse, Point, straightTo } from "@nut-tree/nut-js";

export async function draw(path: Point[]) {
  await mouse.pressButton(Button.LEFT);
  for (let p of path) {
    await mouse.move(straightTo(p));
  }
  await mouse.releaseButton(Button.LEFT);
}
