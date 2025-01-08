
# **A Job Portal Web Application**

This is a full-stack web application designed to connect companies, HR professionals, and job seekers. It offers a seamless interface for managing job postings, applications, and communication between employers and candidates.

## **Project Overview**

### **Objective**

To build an efficient and user-friendly platform for companies to post jobs, HRs to manage job postings, and users to explore and apply for suitable opportunities.

### **Key Features**

#### **For Companies**

-   **Company Registration:** Companies can register to create their profiles and manage their presence on the platform.
-   **HR Management:** Companies can view and manage HR representatives associated with their accounts.

#### **For HR Professionals**

-   **Job Posting Management:**
    -   **Add Jobs:** Create job postings with relevant details.
    -   **Update Jobs:** Modify existing job postings.
    -   **Delete Jobs:** Remove job postings that are no longer needed.
-   **Application Management:**
    -   View all applications for posted jobs.
    -   Respond to applications with a status update (e.g., Accepted, Rejected).

#### **For Job Seekers**

-   **Explore Job Listings:** Browse through job opportunities posted by various companies.
-   **Apply for Jobs:** Submit applications for jobs that match their skills and interests.

### **Job Functions Overview**

The backend of the application supports the following job-related operations:

1.  **Add Job:** Allows HR to create a new job posting.
2.  **Update Job:** Enables modification of an existing job posting.
3.  **Delete Job:** Removes an existing job posting.
4.  **Get Jobs:** Fetches all available job postings for users to browse.
5.  **Apply to Job:** Allows users to submit their applications.
6.  **Get All Applications:** HR can retrieve applications for a specific job posting.
7.  **Respond to Application:** HR can update the status of an application (e.g., Accepted, Rejected).

----------

## **Technologies Used**

### **Frontend**

-   **React.js:** For building the user interface.
-   **Tailwind CSS:** For styling and responsive design.

### **Backend**

-   **Node.js:** For creating the server and API endpoints.
-   **Express.js:** Framework used for building RESTful APIs.
-   **MySQL:** Relational database for storing user, job, and application data.

### **Authentication and Security**

-   **JWT (JSON Web Tokens):** Used for secure user authentication.
-   **bcrypt:** Used for hashing passwords to enhance security.

### **File Management**

-   **Multer:** Handles file uploads (e.g., resumes, profile images).

### **Frontend Utilities**

-   **React-DOM:** Provides DOM-specific methods for React components.

----------

## **Project Setup**

### **Prerequisites**

Before you begin, ensure you have the following installed:

-   Node.js (v16 or above recommended)
-   MySQL (v8.0 or above recommended)
-   npm (Node Package Manager)

### **Installation Steps**

1.  **Clone the Repository:**  
    Open your terminal and run:
    
   ```bash
   git clone https://github.com/vardhann1313/A-Job-Portal-WebApp.git
   ```
    
2.  **Navigate to the Project Directory:**
    
   ```bash
    cd A-Job-Portal-WebApp
   ```
    
3.  **Install Dependencies:**
    
    -   For the backend, navigate to the backend folder:
        
        ```bash
        cd backend  
        npm install
        ```
        
    -   For the frontend, navigate to the frontend folder:
        
        ```bash
        `cd frontend  
        npm install`
        ```
        
4.  **Set Up the Database:**
    
    -   Create a new MySQL database.
    -   Configure the database connection in the backend (usually in a `.env` file or a configuration file).
5.  **Run the Application:**
    
    -   Start the backend server:
        
        ```bash
        npm start
        ```
        
    -   Start the frontend development server:
        
        ```bash
        npm start
        ````
        
6.  **Access the Application:**  
    Open your browser and navigate to `http://localhost:3000` (or the port specified).
    
----------

## **Contributing**

We welcome contributions to enhance the application! Please fork the repository and submit a pull request with your changes.

### **Guidelines:**

1.  Ensure your changes are well-documented.
2.  Test your code before submitting a pull request.
3.  Follow the existing code style and conventions.

----------

## **Acknowledgments**

This application was built using modern web development technologies and tools. A special thanks to contributors who helped improve the project.
