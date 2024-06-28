import { WebSocketServer } from "ws";

export const wsServer = new WebSocketServer({ port: 8080 });

wsServer.on("connection", (client: WebSocket) => {
    console.info(`client connected via ${client.url}`);
});