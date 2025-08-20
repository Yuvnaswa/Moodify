import express from "express";
// import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/signin", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Username is neededS" });
  }
  if (!email) {
    return res.status(400).json({ message: "Username is neededS" });
  }
  if (!password) {
    return res.status(400).json({ message: "Username is neededS" });
  }

  const user = await prisma.user.create({
    data: { username, email, password },
  });
  res
    .status(201)
    .json({ message: "User created successfully", userId: user.id });
});

export default router;
