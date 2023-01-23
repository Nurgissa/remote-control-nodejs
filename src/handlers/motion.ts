import { MotionCommand } from "../types";
import { down, left, mouse, right, up } from "@nut-tree/nut-js";

export async function motionHandler(command: MotionCommand, distance: number) {
  let prompt = "";
  switch (command) {
    case "mouse_up": {
      await mouse.move(up(distance));
      prompt = `mouse_up {${distance} px}`;
      break;
    }
    case "mouse_left": {
      await mouse.move(left(distance));
      prompt = `mouse_left {${distance} px}`;
      break;
    }
    case "mouse_right": {
      await mouse.move(right(distance));
      prompt = `mouse_right {${distance} px}`;
      break;
    }
    case "mouse_down": {
      await mouse.move(down(distance));
      prompt = `mouse_down {${distance} px}`;
      break;
    }
    case "mouse_position": {
      const { x, y } = await mouse.getPosition();
      prompt = `mouse_position {${x} px},{${y} px}`;
    }
  }
  return prompt;
}
