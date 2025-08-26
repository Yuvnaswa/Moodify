import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { validataUser } from "../middleware/validation.js";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/signin", validataUser, async (req, res) => {
  const { username, email, password } = req.body;

  try {
    //check to make sure email is unique
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: "User alrady exists" });
    }
    //hashing the pass for security
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { username, email, password: hashPassword },
    });

    res
      .status(201)
      .json({ message: "User created successfully", userId: user.id });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
