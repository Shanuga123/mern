Hotel Management System
This is a simple web application for hotel management with login and registration functionality using React for the frontend and Node.js with Express for the backend. The application utilizes MongoDB for data storage and JWT for authentication.

Features
User registration and login
JWT-based authentication
Protected dashboard page accessible only to authenticated users
Basic CRUD operations on the dashboard for managing hotels

Technologies Used
Frontend: React
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JSON Web Tokens (JWT)
Password Hashing: bcrypt

Setup and Installation
Prerequisites
Node.js (v14.x or later)
MongoDB
Git
Backend Setup
Clone the repository:
git clone https://github.com/your-username/hotel-management-system.git
cd MERN-SAMPLE/backend
Install the dependencies:
npm install
Create a .env file in the backend directory and add the following environment variables:
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=8000
Start the backend server:
node index.js
Frontend Setup
Navigate to the frontend directory:
cd ../frontend
Install the dependencies:
npm install
Start the frontend development server:
npm start
Running the Application
Ensure that both the backend and frontend servers are running.
Open your browser and navigate to http://localhost:3000.
