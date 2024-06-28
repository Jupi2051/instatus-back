import express from "express";
import v1 from "./v1/mainRoutes";

export const apiRoutes = express.Router();

apiRoutes.use("/api/v1", v1);
// add other verisons if needed
export default apiRoutes;