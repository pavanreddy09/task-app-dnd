# task management application

# Tech stack
- Front end : ReactJS
- Back End : Node.js, Express.js
- Database : MongoDB

# Deployed Link
https://task-app-dnd-fvmo.vercel.app/
# How to Run Task App
Clone the This repo.

### `https://github.com/pavanreddy09/task-app-dnd.git`

First Move to backend Folder (cd backend)
# Backend
create .env file add these fields 
PORT = 4000
DB_URL = <mongodb_url>
JWT_SECRET = <jwt_secret>
CLIENT_ID = <google_client_id>
CLIENT_SECRET = <google_client_secret>
FRONT_END_URL = http://localhost:3000

First install the dependencies.

In the backend directory, you can run:
### `npm install`

After that you can Run below command to Run the backend server:
### `npm start`
it will start runing the server with the nodemon.

# Frontend
Move to the directory frontend(cd frontend)

In the frontend directory, you can run below command to install the dependencies.
### `npm install`

Run the below commad to start the react app:
### `npm start`

Once react app is running you can register a account to create a task.

I have create a some tasks for demo.

Login to demouser to view that.

- email : demouser@gmail.com
- password : Demo@123

# Features includes 
- login/register a user
- login/signup via a google
- while registering user will created with a random avatar.
- create, update, complete and delete a task
- search the task
- Sort the task.
