import express from "express";
import events from "./events/eventRoutes";

export const apiRoutes = express.Router();

apiRoutes.use("", events);

export default apiRoutes;