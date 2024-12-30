const express = require("express");
const router = express.Router();

const { login, signup } = require("../Controller/hrController");
const {
  loginValidation,
  signupValidation,
} = require("../Middleware/hrValidation");

// For role based access ----------------
const {
  authenticateToken,
  authorizeRole,
} = require("../Middleware/roleAuthorization");

// HR auths -----------------------------
router.post(
  "/signup",
  authenticateToken,
  authorizeRole("COMPANY"),
  signupValidation,
  signup
);
router.post("/login", loginValidation, login);

module.exports = router;
