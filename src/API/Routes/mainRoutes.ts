import express from "express";
import events from "./events/eventRoutes";

export const apiRoutes = express.Router();

apiRoutes.use("/api/v1", events);

export default apiRoutes;