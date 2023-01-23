import { createWebSocketStream, WebSocketServer } from "ws";
import * as dotenv from "dotenv";
import { messageHandler } from "./handlers/message";

dotenv.config();

const WS_PORT = Number(process.env.WS_PORT || 8080);

const wss = new WebSocketServer({ port: WS_PORT });
console.log(`Started WebSocket server`);
wss.on("listening", () => {
  console.log(`Listening on port: ${WS_PORT}`);
});

wss.on("connection", function connection(ws) {
  console.log(
    `Accepted connection. Total listeners count: ${ws.listeners.length}`
  );
  const duplex = createWebSocketStream(ws, {
    encoding: "utf8",
    decodeStrings: false,
  });

  duplex.on("data", async (message) => {
    const toSend = await messageHandler(message);
    duplex.write(toSend);
  });

  duplex.on("error", (error) => {
    console.log(`Error occurred: ${error.message}`);
  });

  process.on("SIGINT", () => {
    duplex.end(() => console.log("Closing duplex stream"));
    wss.close(() => console.log("Closing websocket"));
  });
});
