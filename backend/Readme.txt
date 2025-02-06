# Backend Documentation for Job Portal

## Overview

The backend of the **Job Portal** is designed with scalability, security, and efficiency in mind. It follows the **MVC (Model-View-Controller)** architecture, ensuring a clear separation of concerns, which makes the application easier to maintain and extend. The backend is powered by **Node.js** and **Express.js**, with **MongoDB** serving as the database. For secure user authentication, **JWT (JSON Web Tokens)** is used in combination with cookies to manage user sessions.

The backend provides RESTful APIs to manage job listings, user authentication, job applications, and admin functionalities such as creating categories and viewing analytics. The system also includes **pagination** for job listings and user history, and uses **Multer** for file uploads (e.g., resumes). All endpoints are secured, ensuring only authorized users (admin or logged-in users) can access sensitive operations.

---

## Key Features of the Backend

### 1. **MVC Architecture**
- The backend is structured using the **MVC pattern**, which separates the application logic (controllers) from the data (models) and the user interface (views handled by frontend).
- This structure enhances code maintainability, allowing easier debugging and future scaling.

### 2. **JWT Authentication and Cookies**
- **JWT (JSON Web Token)** is used for user authentication, ensuring secure login and registration processes.
- Tokens are stored in **HTTP-only cookies** to prevent XSS attacks and ensure that user sessions are safely managed.
- Users can log in and out, and their sessions are validated using the token on every request to protected routes.

### 3. **Admin & User Roles**
- The backend implements role-based access control (RBAC), with separate permissions for **Admin** and **User** roles.
- Admins can:
  - Create, edit, and delete job listings.
  - Manage job categories.
  - View analytics related to job postings and user applications.
- Users can:
  - Apply for jobs.
  - View their job application history.
  - Search for jobs and filter them by location and category.

### 4. **Job Listings API**
- RESTful endpoints allow admins to create, update, and delete job listings, while users can search, filter, and view job details.
- Pagination is implemented for job listings, ensuring a smooth user experience even with large datasets.
  
### 5. **Job Application System**
- Users can apply for jobs via the **Job Application API**, which stores their application information, including the job ID, user ID, and any uploaded resume files.
- **Multer** is used to handle file uploads, allowing users to submit their resumes when applying for jobs.

### 6. **Search and Filter API**
- The backend provides search functionality by job title, company, location, and category.
- Users can also filter job listings based on category or location, with optimized queries for performance.

### 7. **Admin Dashboard Analytics**
- The backend provides data to generate **Admin Dashboard Analytics**, offering insights into the number of job postings, applications, and user activity.

### 8. **User Dashboard API**
- Users can view their job application history through the **User Dashboard API**, which fetches all the jobs they've applied to, with pagination and sorting options.

### 9. **Secure Data Handling**
- Passwords are hashed using **bcrypt**, ensuring secure storage of user credentials.
- All sensitive data transmissions are encrypted, and the backend enforces HTTPS communication for better security practices.

---

## Tools & Technologies Used

1. **Node.js**: The runtime environment for running JavaScript on the server.
2. **Express.js**: A lightweight framework for building web applications and APIs.
3. **MongoDB**: The NoSQL database used to store all job-related data, user information, and application details.
4. **Mongoose**: An ORM (Object-Relational Mapping) tool for MongoDB, simplifying database interactions.
5. **JWT (JSON Web Token)**: Used for secure user authentication.
6. **Bcrypt**: A hashing library used to securely hash passwords.
7. **Multer**: Middleware for handling file uploads, such as resumes during job applications.
8. **Cookie-Parser**: Used to parse cookies from incoming requests, allowing for secure session management.
9. **Cors**: Middleware for enabling CORS (Cross-Origin Resource Sharing), allowing frontend and backend communication.
10. **Dotenv**: For managing environment variables securely.

---

## REST API Endpoints

### Authentication Endpoints
- **POST /api/auth/register**: User registration.
- **POST /api/auth/login**: User login and JWT generation.
- **GET /api/auth/logout**: Logs out the user and clears the JWT cookie.

### User Endpoints
- **GET /api/user/jobs**: Get all job listings (with pagination).
- **POST /api/user/apply/:jobId**: Apply for a job (requires login).
- **GET /api/user/history**: View user's job application history (requires login).

### Admin Endpoints
- **POST /api/admin/job/create**: Create a new job listing.
- **PUT /api/admin/job/:jobId**: Edit a job listing.
- **DELETE /api/admin/job/:jobId**: Delete a job listing.
- **POST /api/admin/category/create**: Create a new job category.
- **GET /api/admin/analytics**: View job analytics and user activity data.

---

## Models (Mongoose Schemas)

### 1. **User Model**
- Contains user details, including `name`, `email`, `password`, `role` (admin/user), and `jobsApplied` (an array of job IDs).
- Passwords are hashed using **bcrypt** before being stored in the database.

### 2. **Job Model**
- Stores job-related information such as `title`, `description`, `company`, `location`, `category`, and `createdAt`.
- This model also keeps track of which users have applied to each job.

### 3. **Category Model**
- Manages job categories, which are used for filtering job listings.

### 4. **Application Model**
- Stores data related to job applications, including the job ID, user ID, and any uploaded resume files.

---

## How to Run the Backend

### 1. **Clone the Repository**

First, clone the project repository to your local machine:

```bash
git clone https://github.com/username/job-portal.git
cd job-portal/backend
```

### 2. **Install Dependencies**

Ensure you have **Node.js** installed. Navigate to the backend directory and install the required dependencies:

```bash
npm install
```

### 3. **Set Up Environment Variables**

Create a `.env` file in the `backend` directory. Add the following variables (make sure to replace values with your own configuration):

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/job_portal_db
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### 4. **Run MongoDB**

Ensure that **MongoDB** is running on your machine. If you have MongoDB installed locally, you can start it with:

```bash
mongod
```

Alternatively, if you are using MongoDB Atlas (cloud version), ensure your `MONGO_URI` is correctly set in the `.env` file.

### 5. **Start the Backend Server**

Now you can start the backend server by running:

```bash
npm start
```

The server will start on `http://localhost:5000` (or the port you defined in your `.env` file).

### 6. **Testing the API**

You can test the API using **Postman** or **curl**. Ensure the frontend is running, and make requests to the endpoints (e.g., login, register, job listings) to test the functionality.

---

## Future Enhancements

1. **Email Notifications**: Send users confirmation emails after applying for jobs and notify them when their application status changes.
   
2. **Admin Analytics Dashboard**: Add more detailed analytics such as user engagement, the number of applications per job, and user demographics.

3. **Resume Parsing**: Implement a system that can automatically parse uploaded resumes and match them with job requirements.

4. **OAuth Integration**: Allow users to sign up and log in using social platforms like Google or LinkedIn for faster and more secure authentication.

---

## Conclusion

The backend of the **Job Portal** is designed to be secure, scalable, and maintainable. It leverages modern technologies such as **Node.js**, **Express.js**, **MongoDB**, and **JWT** to deliver a feature-rich job application system. With a clear separation of concerns through the **MVC architecture**, the system is structured to be easily extendable for future enhancements.