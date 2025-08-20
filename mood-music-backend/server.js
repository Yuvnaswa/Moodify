import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is runnung at ${PORT}`);
});
