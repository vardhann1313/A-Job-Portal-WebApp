# **A Job Portal Web Application**

This is a full-stack web application designed to connect companies, HR professionals, and job seekers. It offers a seamless interface for managing job postings, applications, and communication between employers and candidates.

---

## **Project Overview**

### **Objective**

To build an efficient and user-friendly platform for companies to post jobs, HRs to manage job postings, and users to explore and apply for suitable opportunities.

### **Key Features**

#### **For Companies**

- **Company Registration:** Companies can register to create their profiles and manage their presence on the platform.
- **HR Management:** Companies can view and manage HR representatives associated with their accounts.

#### **For HR Professionals**

- **Job Posting Management:**
  - **Add Jobs:** Create job postings with relevant details.
  - **Update Jobs:** Modify existing job postings.
  - **Delete Jobs:** Remove job postings that are no longer needed.
- **Application Management:**
  - View all applications for posted jobs.
  - Respond to applications with a status update (e.g., Accepted, Rejected).

#### **For Job Seekers**

- **Explore Job Listings:** Browse through job opportunities posted by various companies.
- **Apply for Jobs:** Submit applications for jobs that match their skills and interests.

### **Job Functions Overview**

The backend of the application supports the following job-related operations:

1. **Add Job:** Allows HR to create a new job posting.
2. **Update Job:** Enables modification of an existing job posting.
3. **Delete Job:** Removes an existing job posting.
4. **Get Jobs:** Fetches all available job postings for users to browse.
5. **Apply to Job:** Allows users to submit their applications.
6. **Get All Applications:** HR can retrieve applications for a specific job posting.
7. **Respond to Application:** HR can update the status of an application (e.g., Accepted, Rejected).

---

## **Technologies Used**

### **Frontend**

- **React.js:** For building the user interface.
- **Tailwind CSS:** For styling and responsive design.

### **Backend**

- **Node.js:** For creating the server and API endpoints.
- **Express.js:** Framework used for building RESTful APIs.
- **MySQL:** Relational database for storing user, job, and application data.

### **Authentication and Security**

- **JWT (JSON Web Tokens):** Used for secure user authentication.
- **bcrypt:** Used for hashing passwords to enhance security.

### **File Management**

- **Multer:** Handles file uploads (e.g., resumes, profile images).

### **Frontend Utilities**

- **React-DOM:** Provides DOM-specific methods for React components.

---

## **Deployment Information**

### **Frontend Deployment**

The frontend is deployed on an AWS EC2 instance using Nginx as a web server:

- The production build of the frontend is served via Nginx.
- Public access is allowed through port 80.
- Static files are placed in `/var/www/html`.

### **Backend Deployment**

The backend is deployed on the same EC2 instance:

- Node.js server runs via PM2 for process management.
- Nginx is configured as a reverse proxy to forward `/api` requests to the backend server.
- Port 3000 is exposed internally, and Nginx handles routing.

### **Database Deployment**

The MySQL database is hosted on **Amazon Aurora RDS**:

- Secure access is configured through VPC and Security Groups.
- The backend connects to the Aurora instance using environment-based credentials.

---

## **Project Setup**

### **Prerequisites**

Before you begin, ensure you have the following installed:

- Node.js (v16 or above recommended)
- MySQL (v8.0 or above recommended)
- npm (Node Package Manager)

### **Installation Steps**

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/vardhann1313/A-Job-Portal-WebApp.git
   ```

2. **Navigate to the Project Directory:**
   ```bash
   cd A-Job-Portal-WebApp
   ```

3. **Install Dependencies:**

   - For the backend:
     ```bash
     cd backend  
     npm install
     ```

   - For the frontend:
     ```bash
     cd ../frontend  
     npm install
     ```

4. **Set Up the Database:**

   - Create a new MySQL database or connect to an existing Aurora RDS instance.
   - Configure the database connection in the backend (`.env` file or configuration file).

5. **Run the Application Locally:**

   - Start the backend server:
     ```bash
     npm start
     ```

   - Start the frontend development server:
     ```bash
     npm start
     ```

6. **Access the Application:**
   Open your browser and navigate to `http://localhost:3000` (or the port specified).

---

## **Contributing**

We welcome contributions to enhance the application! Please fork the repository and submit a pull request with your changes.

### **Guidelines:**

1. Ensure your changes are well-documented.
2. Test your code before submitting a pull request.
3. Follow the existing code style and conventions.

---

## **Contributors**

Made with ❤️ by:

<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/harsh-vardhan-mishra-19729b185/"><img src="https://avatars.githubusercontent.com/u/79779459?v=4" width="100px;" alt="Harshvardhan Mishra"/><br /><sub><b>Harshvardhan Mishra</b></sub></a><br /></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/akshadjaiswal"><img src="https://avatars.githubusercontent.com/u/111684658?v=4" width="100px;" alt="Akshad Jaiswal"/><br /><sub><b>Akshad Jaiswal</b></sub></a><br /></td>
    </tr>
  </tbody>
</table>

Want to contribute? Open a pull request and be part of the contributor list!
