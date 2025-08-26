import jwt from "jsonwebtoken";
const JWT_SECRETE = process.env.JWT_SECRETE;

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token, JWT_SECRETE);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).json({ message: "No token provided" });
  }
};
