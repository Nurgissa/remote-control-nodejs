import WebSocket, { RawData, WebSocketServer } from "ws";
import { motionHandler } from "../handlers/motion";
import { drawHandler } from "../handlers/draw";
import { screenHandler } from "../handlers/screen";

const wss = new WebSocketServer({ port: 8080 });

function messageHandler(ws: WebSocket) {
  return async function (data: RawData) {
    const [command, dx = 0, dy = 0] = data.toString().trim().split(" ");
    const x = Number(dx),
      y = Number(dy);
    switch (command) {
      case "mouse_up":
      case "mouse_left":
      case "mouse_right":
      case "mouse_down":
      case "mouse_position": {
        const result = await motionHandler(command, x);
        console.log(result);
        ws.send(result);
        break;
      }
      case "draw_square":
      case "draw_rectangle":
      case "draw_circle": {
        const result = await drawHandler(command, x, y);
        console.log(result);
        ws.send(result);
        break;
      }
      case "prnt_scrn": {
        console.log("<- prnt_scrn");
        const result = await screenHandler();
        console.log(`-> ${result}`);
        ws.send(result);
        break;
      }
      default: {
        console.log(
          `Unhandled "${command}" command with argument: ${dx} ${dy}`
        );
      }
    }
  };
}

wss.on("connection", function connection(ws) {
  ws.on("message", messageHandler(ws));
});
