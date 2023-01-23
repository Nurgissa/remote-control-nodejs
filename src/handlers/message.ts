import WebSocket, { RawData } from "ws";
import { motionHandler } from "./motion";
import { drawHandler } from "./draw";
import { screenHandler } from "./screen";

export async function messageHandler(data: RawData) {
  let result = "";
  const [command, dx = 0, dy = 0] = data.toString().trim().split(" ");
  const x = Number(dx),
    y = Number(dy);
  switch (command) {
    case "mouse_up":
    case "mouse_left":
    case "mouse_right":
    case "mouse_down":
    case "mouse_position": {
      result = await motionHandler(command, x);
      console.log(`<- ${result}`);
      break;
    }
    case "draw_square":
    case "draw_rectangle":
    case "draw_circle": {
      result = await drawHandler(command, x, y);
      console.log(`<- ${result}`);
      break;
    }
    case "prnt_scrn": {
      console.log("<- prnt_scrn");
      result = await screenHandler();
      console.log(`-> ${result.substring(0, 20)}`);
      break;
    }
    default: {
      console.log(`Unhandled "${command}" command with argument: ${dx} ${dy}`);
    }
  }
  return result;
}
