const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../database");

// Functions related to user Auth ----------------

// Signup ----------------------------------------
const signup = async (req, res) => {
  let conn;
  try {
    conn = await db.getConnection();

    const { seeker_name, location, qualification, DOB, email, password } =
      req.body;

    const check_query = `SELECT * FROM Seeker WHERE email = '${email}'`;
    const [check_result] = await conn.execute(check_query);
    if (check_result.length != 0) {
      return res.status(409).json({
        message: "User already registered !",
        success: false,
      });
    }

    const hashPassword = await bcrypt.hash(password, 11);
    const query =
      "INSERT INTO Seeker (seeker_name, location, qualification, email, dob, password_hash) VALUES (?, ?, ?, ?, ?, ?)";
    const [result] = await conn.execute(query, [
      seeker_name,
      location,
      qualification,
      email,
      DOB,
      hashPassword,
    ]);

    return res.status(201).json({
      message: "User registered succesfully !",
      Id: result.insertId,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Registration failed ",
      success: false,
    });
  } finally {
    conn.release();
  }
};

// Update -----------------------------------------
const update = async (req, res) => {
  let conn;
  try {
    conn = await db.getConnection();

    const { seeker_name, location, qualification, DOB, email } = req.body;
    const seeker_id = req.user._id;

    const query =
      "UPDATE Seeker SET seeker_name=?, location=?, qualification=?, email=?, dob=? WHERE seeker_id=?";
    const [result] = await conn.execute(query, [
      seeker_name,
      location,
      qualification,
      email,
      DOB,
      seeker_id,
    ]);

    return res.status(201).json({
      message: "User updated succesfully !",
      AffectedRows: result.affectedRows,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Process failed ",
      success: false,
    });
  } finally {
    conn.release();
  }
};

// Login ---------------------------------------------
const login = async (req, res) => {
  let conn;
  try {
    conn = await db.getConnection();

    const { email, password } = req.body;

    const query = `SELECT * FROM Seeker WHERE email = '${email}'`;
    const [seeker] = await conn.execute(query);

    if (seeker.length == 0) {
      return res.status(403).json({
        message: "Authentication failed | User not found !",
        success: false,
      });
    }

    const dbPass = seeker[0].password_hash;
    const isPassEqual = await bcrypt.compare(password, dbPass);
    if (!isPassEqual) {
      return res.status(400).json({
        message: "Incorrect password !",
        success: false,
      });
    }

    const jwtToken = jwt.sign(
      {
        username: seeker[0].seeker_name,
        _id: seeker[0].seeker_id,
        role: "SEEKER",
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    const name = seeker[0].seeker_name;
    const role = "SEEKER";
    return res.status(200).json({
      message: "Login succesfully !",
      name,
      role,
      jwtToken,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong !",
      success: false,
    });
  } finally {
    conn.release();
  }
};

// Get all jobs for seeker -------------------------------
const getAllJobs = async (req, res) => {
  let conn;
  try {
    conn = await db.getConnection();

    const seeker_id = req.user._id;

    const query = `SELECT j.*, c.company_name FROM JOB j LEFT JOIN Company c ON j.company_id = c.company_id WHERE is_active = true AND job_id NOT IN (SELECT job_id FROM Application WHERE seeker_id = ${seeker_id})`;
    const [data] = await conn.execute(query);

    if (data.AffectedRows == 0) {
      return res.status(404).json({
        message: "No job found !",
        success: false,
      });
    }

    return res.status(201).json({
      message: "Fetched successfully !",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong !",
      success: false,
    });
  } finally {
    conn.release();
  }
};

// Exporting -----------------------------
module.exports = {
  signup,
  login,
  update,
  getAllJobs,
};
