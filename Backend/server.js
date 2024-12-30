const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

// Important --------------------------------------
app.use(cors());
app.use(bodyParser.json());

// Routers ----------------------------------------
const { companyRouter, seekerRouter, hrRouter, jobRouter } = require("./Route");

// dotenv file ------------------------------------
require("dotenv").config();
const PORT = process.env.PORT;

// Basic endpoint ---------------------------------
app.get("/", (req, res) => {
  res.send("Server is running ...");
});

// company authentication endpoint ----------------
app.use("/api/company", companyRouter);

// user authentication endpoint -------------------
app.use("/api/seeker", seekerRouter);

// HR authentication endpoint -------------------
app.use("/api/hr", hrRouter);

// Job operations -------------------------------
app.use("/api/hr/jobs", jobRouter);

// Server -----------------------------------------
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
