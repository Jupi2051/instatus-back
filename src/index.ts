
import express from 'express';
import cors from "cors";
import 'dotenv/config';
import apiRoutes from "./API/Routes/mainRoutes";

const app = express();
const PORT = Number(process.env.PORT) || 3005;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routing
app.use(apiRoutes);

app.all("*", (_, res) => res.status(404).send("This route was not found."));

// Server activation
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});