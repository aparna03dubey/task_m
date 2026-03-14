# Backend Developer Internship Assignment

## Tech Stack
Node.js
Express.js
MongoDB Atlas
JWT Authentication
React (Vite)

## Features
User Registration
User Login
JWT Authentication
Create Task
View Tasks
Update Task
Delete Task

## API Endpoints

POST /api/v1/auth/register  
POST /api/v1/auth/login  

POST /api/v1/tasks  
GET /api/v1/tasks  
PUT /api/v1/tasks/:id  
DELETE /api/v1/tasks/:id  

## Setup Instructions

Backend

npm install
npm run dev

Frontend

cd frontend
npm install
npm run dev

## Scalability Design

The backend follows a modular architecture using controllers, models, routes and middleware.

Future improvements could include:

• Redis caching  
• Docker containerization  
• Load balancing  
• Kubernetes scaling