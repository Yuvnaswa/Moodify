import { body, validationResult } from "express-validator";

//Validation rules
export const validataUser = [
  body("username").notEmpty().withMessage("Username is needed"),
  body("email").isEmail().withMessage("Email is needed"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  //Error handling
  (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ error: err.array() });
    }
    next();
  },
];
