const express = require("express");
const router = express.Router();

// Configure express to parse raw file ----
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

// Authorizer --------------------
const {
  authenticateToken,
  authorizeRole,
} = require("../Middleware/roleAuthorization");

// Validation - Insert Update ----
const { insertJob } = require("../Middleware/jobValidation");

// Job controllers ---------------
const {
  addJob,
  updateJob,
  deleteJob,
  getJobs,
  applyToJob,
  getAllApplications,
  respondOnApplication,
} = require("../Controller/jobController");

// Routing -----------------------

// Job APIs ----------------------
router.post(
  "/addJob",
  authenticateToken,
  authorizeRole(["HR"]),
  insertJob,
  addJob
);

router.put(
  "/updateJob:id",
  authenticateToken,
  authorizeRole(["HR", "COMPANY"]),
  insertJob,
  updateJob
);

router.delete(
  "/deleteJob:id",
  authenticateToken,
  authorizeRole(["HR", "COMPANY"]),
  deleteJob
);

router.get(
  "/getJobs",
  authenticateToken,
  authorizeRole(["HR", "COMPANY"]),
  getJobs
);

// Apply feature for seeker -------
router.post(
  "/apply:id",
  upload.single("resume"),
  authenticateToken,
  authorizeRole(["SEEKER"]),
  applyToJob
);

// Get all applications for HR and Company --------
router.get(
  "/getAllApplications",
  authenticateToken,
  authorizeRole(["HR", "COMPANY"]),
  getAllApplications
);

// Respond on a application for HR and Commpany -----
router.put(
  "/respond:id",
  authenticateToken,
  authorizeRole(["HR", "COMPANY"]),
  respondOnApplication
);

// Exporting --------------------
module.exports = router;
