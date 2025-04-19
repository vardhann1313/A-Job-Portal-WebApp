-- Step 1: Create the database ---------------------------------------------------------------
CREATE DATABASE IF NOT EXISTS JobPortal;

-- Step 2: Use the database ---------------------------------------------------------------
USE JobPortal;

-- Step 3: Create the Company table
CREATE TABLE Company (
    company_id INT AUTO_INCREMENT PRIMARY KEY,     -- Unique identifier for each company
    company_name VARCHAR(255) NOT NULL,            -- Name of the company
    location VARCHAR(255),                         -- Location of the company
    description TEXT,                              -- Brief description of the company
    username VARCHAR(50) UNIQUE NOT NULL,          -- Username for the company login
    password_hash VARCHAR(255) NOT NULL,           -- Password stored as a hash for security
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp when the record is created
);
SELECT * FROM Company;

-- Step 4: Create the Seeker table ---------------------------------------------------------------
CREATE TABLE Seeker (
    seeker_id INT AUTO_INCREMENT PRIMARY KEY,      -- Unique identifier for each seeker
    seeker_name VARCHAR(255) NOT NULL,             -- Name of the job seeker
    email VARCHAR(255) UNIQUE NOT NULL,            -- Email for login and contact
    password_hash VARCHAR(255) NOT NULL,           -- Password stored as a hash for security
    dob DATE,                                      -- Date of birth of the seeker
    location VARCHAR(255),                         -- Current location of the seeker
    qualification TEXT,                            -- Education details of the seeker
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp of account creation
);
SELECT * FROM Seeker;

-- Step 5: Create the HR table ---------------------------------------------------------------
CREATE TABLE HR (
    hr_id INT AUTO_INCREMENT PRIMARY KEY,            -- Unique identifier for each HR
    hr_name VARCHAR(255) NOT NULL,                   -- Name of the HR
    email VARCHAR(255) UNIQUE NOT NULL,              -- Email for HR login
    password_hash VARCHAR(255) NOT NULL,             -- Password stored as a hash for security
    company_id INT NOT NULL,                         -- Foreign key to associate HR with a company
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Timestamp of when the HR was added
    FOREIGN KEY (company_id) REFERENCES 
    Company(company_id) ON DELETE CASCADE            -- Deletes HR records if the associated company is deleted
);
SELECT * FROM HR;


-- Step 6: Create the Job table ---------------------------------------------------------------
CREATE TABLE Job (
    job_id INT AUTO_INCREMENT PRIMARY KEY,                  -- Unique identifier for each job
    title VARCHAR(255) NOT NULL,                            -- Job title
    location VARCHAR(255) NOT NULL,                         -- Job location
    type ENUM('Full-time', 'Part-time', 'Remote') NOT NULL, -- Job type
    role VARCHAR(255) NOT NULL,                             -- Job role/position
    salary DECIMAL(10, 2),                                  -- Salary for the job
    requirements TEXT NOT NULL,                             -- Job requirements
    is_active BOOLEAN DEFAULT TRUE,                         -- Whether the job is active (default is true)
    hr_id INT,                                              -- Foreign key referencing HR who posted the job
    company_id INT NOT NULL,                                -- Foreign key referencing the company
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,         -- Timestamp of job posting
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON 
    UPDATE CURRENT_TIMESTAMP,                               -- Timestamp of last update
    FOREIGN KEY (hr_id) REFERENCES HR(hr_id) ON 
    DELETE SET NULL,                                        -- Relationship with HR table
    FOREIGN KEY (company_id) REFERENCES 
    Company(company_id) ON DELETE CASCADE                   -- Relationship with Company table
);
SELECT * FROM Job;

-- Step 7: Create the Application table -----------------------------------------------------------
CREATE TABLE Application (
    application_id INT AUTO_INCREMENT PRIMARY KEY,                 -- Unique identifier for each application
    seeker_id INT NOT NULL,                                        -- Foreign key referencing the seeker applying for the job
    job_id INT NOT NULL,                                           -- Foreign key referencing the job being applied for
    resume LONGBLOB,                                                   -- Binary Large Object to store the resume
    status ENUM('Pending', 'Viewed', 'Rejected', 'Accepted') 
    DEFAULT 'Pending',                                             -- Status of the application
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,                -- Timestamp of the application
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
    ON UPDATE CURRENT_TIMESTAMP,                                   -- Timestamp of last status update
    FOREIGN KEY (seeker_id) REFERENCES Seeker(seeker_id)
    ON DELETE CASCADE,                                             -- Relationship with Seeker table
    FOREIGN KEY (job_id) REFERENCES Job(job_id) ON DELETE CASCADE  -- Relationship with Job table
);
SELECT * FROM Application;
