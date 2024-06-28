import { WebSocketServer } from "ws";
import http from "http";

const server = http.createServer();
export const wsServer = new WebSocketServer({ server: server });

wsServer.on("connection", (client: WebSocket) => {
    console.info(`client connected state: ${client.readyState}`);
});


export default function beginWebsocketServer() {
    // Create an HTTP server
    server.listen(3000, () => {
        console.log(`WebSocket server is listening on sport ${3000}`);
    });
}