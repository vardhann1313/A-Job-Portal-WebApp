const db = require("../database");

// Functions related to Job ------------------

// Add job -----------------------------------
const addJob = async (req, res) => {
  let conn;
  try {
    conn = await db.getConnection();
    const { title, location, type, role, salary, requirements, is_active } =
      req.body;
    const hr_id = req.user._id;
    const company_id = req.user.companyId;

    const query =
      "INSERT INTO Job (title, location, type, role, salary, requirements, is_active, hr_id, company_id) VALUES (?,?,?,?,?,?,?,?,?)";
    const [result] = await conn.execute(query, [
      title,
      location,
      type,
      role,
      salary,
      requirements,
      is_active,
      hr_id,
      company_id,
    ]);

    return res.status(201).json({
      message: "Job added succesfully !",
      Id: result.insertId,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong ",
      success: false,
    });
  } finally {
    conn.release();
  }
};

// Update job --------------------------------
const updateJob = async (req, res) => {
  let conn;
  try {
    conn = await db.getConnection();
    const { title, location, type, role, salary, requirements, is_active } =
      req.body;

    const job_id = parseInt(req.params.id);

    const query =
      "UPDATE Job SET title=?, location=?, type=?, role=?, salary=?, requirements=?, is_active=? WHERE job_id=?";
    const [result] = await conn.execute(query, [
      title,
      location,
      type,
      role,
      salary,
      requirements,
      is_active,
      job_id,
    ]);

    if (result.affectedRows == 0) {
      return res.status(404).json({
        message: "Job not found !",
        success: false,
      });
    }

    return res.status(201).json({
      message: "Job updated succesfully !",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong ",
      success: false,
    });
  } finally {
    conn.release();
  }
};

// Delete job --------------------------------
const deleteJob = async (req, res) => {
  let conn;
  try {
    conn = await db.getConnection();
    const job_id = parseInt(req.params.id);

    const query = `DELETE FROM Job WHERE job_id = ${job_id}`;
    const [result] = await conn.execute(query);

    if (result.affectedRows == 0) {
      return res.status(404).json({
        message: "No job deleted !",
        success: false,
      });
    }

    return res.status(201).json({
      message: "Job deleted succesfully !",
      result,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong ",
      success: false,
    });
  } finally {
    conn.release();
  }
};

// Fetch job --------------------------------
const getJobs = async (req, res) => {
  let conn;
  try {
    conn = await db.getConnection();

    let company_id = req.user.companyId;
    if (company_id == undefined) {
      company_id = req.user._id;
    }

    const query = `SELECT * FROM Job WHERE company_id = ${company_id}`;
    const [data] = await conn.execute(query);

    if (data.affectedRows == 0) {
      return res.status(404).json({
        message: "No job found !",
        success: false,
      });
    }

    return res.status(201).json({
      message: "Job fetched succesfully !",
      data,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong ",
      error,
      success: false,
    });
  } finally {
    conn.release();
  }
};

// Apply to job ---------------
const applyToJob = async (req, res) => {
  let conn;
  try {
    conn = await db.getConnection();

    const resumeBuffer = req.file.buffer;
    const job_id = req.params.id;
    const seeker_id = req.user._id;

    const query =
      "INSERT INTO Application (job_id, seeker_id, resume) VALUES (?, ?, ?)";
    const [data] = await conn.execute(query, [job_id, seeker_id, resumeBuffer]);

    return res.status(200).json({
      message: "Applied successfully !",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong ",
      success: false,
    });
  } finally {
    conn.release();
  }
};

// Get all applications by company id ----------
const getAllApplications = async (req, res) => {
  let conn;
  try {
    conn = await db.getConnection();

    const role = req.user.role;
    let company_id;
    if (role === "HR") {
      company_id = req.user.companyId;
    } else {
      company_id = req.user._id;
    }

    const query = `SELECT 
	                      J.job_id,
                        J.title, 
                        J.type, 
                        J.role, 
                        J.salary, 
                        J.requirements, 
                        J.created_at, 
                        J.location,
                        H.hr_name, 
                        A.application_id, 
                        A.resume, 
                        A.status, 
                        A.applied_at, 
                        S.seeker_name,
                        S.email
                    FROM Job J 
                    INNER JOIN Application A ON J.job_id = A.job_id 
                    LEFT JOIN Seeker S ON A.seeker_id = S.seeker_id
                    LEFT JOIN HR H ON H.hr_id = J.hr_id 
                    WHERE J.company_id = ${company_id}`;

    const [data] = await conn.execute(query);

    return res.status(201).json({
      message: "Fetched successfully !",
      data,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong ",
      success: false,
    });
  } finally {
    conn.release();
  }
};

// Respond on applications ---------------------------
const respondOnApplication = async (req, res) => {
  let conn;
  try {
    conn = await db.getConnection();

    const { status } = req.body;
    const application_id = parseInt(req.params.id);

    const query = `UPDATE Application SET status='${status}' WHERE application_id=${application_id}`;
    const [result] = await conn.execute(query);

    return res.status(201).json({
      message: "Responded succesfully !",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong ",
      success: false,
    });
  } finally {
    conn.release();
  }
};

module.exports = {
  addJob,
  updateJob,
  deleteJob,
  getJobs,
  applyToJob,
  getAllApplications,
  respondOnApplication,
};
