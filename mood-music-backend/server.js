import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);

app.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to your profile", user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server is runnung at ${PORT}`);
});
