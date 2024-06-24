import express from "express";


export const apiRoutes = express.Router();

apiRoutes.use("/api/v1/", (_, res) => {
    res.sendStatus(200);
});

export default apiRoutes;