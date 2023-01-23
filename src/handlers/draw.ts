import { mouse } from "@nut-tree/nut-js";
import {
  getCirclePoints,
  getRectanglePoints,
  getSquarePoints,
} from "../coordinates";
import { draw } from "../utils";
import { DrawCommand } from "../types";

export async function drawHandler(
  command: DrawCommand,
  width: number,
  length: number
) {
  const position = await mouse.getPosition();
  let prompt = "";
  switch (command) {
    case "draw_square": {
      const path = getSquarePoints(position.x, position.y, width);
      await draw(path);
      prompt = `draw_square {${width} px}`;
      break;
    }
    case "draw_rectangle": {
      const path = getRectanglePoints(position.x, position.y, width, length);
      await draw(path);
      prompt = `draw_rectangle {${width} px} {${length} px}`;
      break;
    }
    case "draw_circle": {
      const [start, ...path] = getCirclePoints(position.x, position.y, width);
      await mouse.setPosition(start);
      await draw([...path, start]);
      prompt = `draw_circle {${width} px}`;
      break;
    }
  }
  return prompt;
}
