
import express from 'express';
import cors from "cors";
import 'dotenv/config';
import apiRoutes from "./API/Routes/apiRoutesWithVersions";
import { events } from './Database';
import helmet from 'helmet';
import http from "http";
import { WebSocketServer } from 'ws';

export const eventsDb = new events();
const app = express();
const PORT = Number(process.env.PORT) || 3005;

app.use(helmet()); // helmet for header securing and making sure our api is safe.
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use(apiRoutes);

app.all("*", (_, res) => res.status(404).send("This route was not found."));

// Server activation
const server = http.createServer(app);
export const wsServer = new WebSocketServer({ server: server });
wsServer.on("connection", (client) => {
  console.log(`client connected ` + client.readyState);
})

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});