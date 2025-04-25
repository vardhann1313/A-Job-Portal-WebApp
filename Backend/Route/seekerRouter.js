const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  update,
  getAllJobs,
  getApplications,
  generateQuestions
} = require("../Controller/userController");
const {
  loginValidation,
  signupValidation,
  updateValidation,
} = require("../Middleware/userValidation");

// For role based access ----------------
const {
  authenticateToken,
  authorizeRole,
} = require("../Middleware/roleAuthorization");

// Seeker auths -------------------------
router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.put(
  "/update",
  authenticateToken,
  authorizeRole("SEEKER"),
  updateValidation,
  update
);

// Get all jobs for seeker --------------
router.get(
  "/getAllJobs",
  authenticateToken,
  authorizeRole("SEEKER"),
  getAllJobs
);

// Get applications of seeker -----------
router.get(
  "/getApplications",
  authenticateToken,
  authorizeRole("SEEKER"),
  getApplications
);

// Generate interview questions ----------
router.post(
  "/generateQuestions",
  authenticateToken,
  authorizeRole("SEEKER"),
  generateQuestions
);

module.exports = router;