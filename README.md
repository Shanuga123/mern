<h1 align="center">
   HOTEL MANAGEMENT CRUD 
</h1>

<h3 align="center">
This is a simple Crud web application for hotel management with login and registration functionality using React for the frontend and Node.js with Express for the backend. The application utilizes MongoDB for data storage and JWT for authentication.
</h3>

<br>


<br><br>



## Features

- **User registration and login:** 

- **JWT-based authentication:** 

- **Protected dashboard page accessible only to authenticated users** 

- **Basic CRUD operations on the dashboard for managing hotels**
  


## Technologies Used

- Frontend: React.js, Material UI, Redux
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JSON Web Tokens (JWT)
- Password Hashing: bcrypt

<br>

# Installation

```sh
git clone https://github.com/Shanuga123/mern.git
```
Open 2 terminals in separate windows/tabs.

Terminal 1: Setting Up Backend 
```sh
cd backend
npm install
node index.js
```

Create a file called .env in the backend folder.
Inside it write this :

- MONGODB_URI=your_mongodb_uri
- JWT_SECRET=your_jwt_secret
- PORT=8000




Instead of this link write your database link.

Terminal 2: Setting Up Frontend
```sh
cd frontend
npm install
npm start
```
Now, navigate to `localhost:3000` in your browser. 
The Backend API will be running at `localhost:8000`.





<br>



