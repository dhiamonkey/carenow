import express from "express";
import dataRoutes from "../routes/routes";
import cors from "cors";
import "dotenv/config";

require("dotenv").config();
export const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/", dataRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
