# MyTube - YouTube Clone MERN App

## Overview

MyTube is a full-stack YouTube clone application built using the MERN stack (MongoDB, Express.js, React, Node.js). The platform allows users to register, log in, create channels, upload videos by URL, view and interact with videos (like, dislike, comment), and search/filter content.

This project was developed as a capstone assignment to demonstrate the practical application of a modern web development stack, with features often required in real-world video-sharing platforms.

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Running the App](#running-the-app)  
- [Project Structure](#project-structure)  
- [API Endpoints](#api-endpoints)  
- [Usage](#usage)  
- [Screenshots](#screenshots)  
- [Contributing](#contributing)  
- [License](#license)  
- [Acknowledgments](#acknowledgments)

## Features

- **User Authentication** with secure JWT-based login and registration  
- **Channel Management**: users can create channels and manage their videos  
- **Video Upload**: upload videos via URL and add metadata (title, description, thumbnail, category)  
- **Video Player**: watch videos, see details, like/dislike, view counts increment  
- **Comments**: add, edit, delete comments on videos  
- **Search and Filters**: search videos by title and filter by categories  
- **Responsive UI** with a toggleable sidebar, header, footer, and video grid layouts  
- **Protected Routes** on the backend to ensure secure access to user-specific data  
- **Lazy Loading and Routing**: React Router v6 with code-splitting and suspense/loading indicators

## Tech Stack

- **Frontend:** React, React Router, React Icons, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (via Mongoose)  
- **Authentication:** JSON Web Tokens (JWT)  
- **Other:** reactjs-popup for modals, bcryptjs for hashing passwords

## Getting Started

### Prerequisites

- Node.js (v16 or above recommended)  
- MongoDB Atlas account or local MongoDB server  
- npm or yarn package manager  

### Installation

1. **Clone the repository**

git clone https://github.com/Keerthi-Chiru/youtube-clone
cd youtube-clone

text

2. **Backend Setup**

cd backend
npm install

text

3. **Frontend Setup**

cd ../frontend
npm install

text

### Environment Variables

Create a `.env` file in the backend root folder with the following variables:

PORT=5000
MONGO_URI=mongodb+srv://keerthi05niru:5tfkzSVnevwlS2MH@clusterchiru.1cmj9aw.mongodb.net/
JWT_SECRET=ChiruKNC57

text

Replace `your_mongo_connection_string` with your MongoDB URI and `your_jwt_secret_key` with a secure random string.

### Running the App

1. Start the backend server:

cd back-end
npm start

text

2. Start the frontend development server (open a new terminal):

cd front-end
npm run dev

text

The frontend will typically run on `http://localhost:3000`, and the backend on `http://localhost:7000`.

## Project Structure

mytube-mern-clone/
│
├── backend/
│ ├── controllers/ # Express route controllers
│ ├── middlewares/ # Authentication middleware
│ ├── models/ # Mongoose models for User, Video, Channel, Comments
│ ├── routes/ # Express API routes
│ ├── server.js # Express server entry point
│ └── .env # Environment variables
│
├── frontend/
│ ├── src/
│ │ ├── components/ # React components (Header, Sidebar, Video player...)
│ │ ├── pages/ # Page components (Login, Register, Home, Channel...)
│ │ ├── App.jsx # Main app layout with routes
│ │ ├── index.jsx # React DOM root
│ │ └── App.css # Tailwind & custom styles
│ ├── package.json
│ └── ...
│
└── README.md # Project documentation (this file)

text

## API Endpoints (Summary)

### Auth

- `POST /api/auth/register` - Register new user  
- `POST /api/auth/login` - User login  

### Channels

- `GET /api/channel` - Get user's channels (protected)  
- `POST /api/channel` - Create new channel (protected)  
- `GET /api/channel/:channelId` - Get single channel (protected)  
- `DELETE /api/channel/:id` - Delete channel (protected)  

### Videos

- `GET /api/video` - Get all videos  
- `GET /api/video/:videoId` - Get video (increment views)  
- `GET /api/video/info/:videoId` - Get video (without view increment)  
- `POST /api/video/upload` - Upload a new video (protected)  
- `PUT /api/video/:videoId` - Update video details (protected)  
- `DELETE /api/video/:videoId` - Delete a video (protected)  
- `PATCH /api/video/:videoId/like` - Add like (protected)  
- `PATCH /api/video/:videoId/dislike` - Add dislike (protected)  

### Comments

- `POST /api/video/:videoId/comment` - Add new comment (protected)  
- `PATCH /api/video/:videoId/comment/:commentId` - Edit comment (protected, owner only)  
- `DELETE /api/video/:videoId/comment/:commentId` - Delete comment (protected, owner only)  

## Usage

- Register an account and log in  
- Create your own channel  
- Upload videos by providing video and thumbnail URLs  
- Browse videos filtered by categories or search titles  
- Watch videos, like/dislike, and comment  
- Manage your channels and videos  

## Screenshots

*You can add relevant screenshots here showing your UI on desktop, tablet, and mobile, e.g.:*

- Home page with video thumbnails and search bar  
![alt text](image.png)
- Video player page with comments section  
![alt text](image-1.png)
- Channel page listing videos and upload form  
![alt text](image-2.png)
- Authentication pages (login/registration)
![alt text](image-3.png)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repo  
2. Create a feature branch (`git checkout -b feature-name`)  
3. Commit your changes (`git commit -m 'Add new feature'`)  
4. Push to branch (`git push origin feature-name`)  
5. Create a Pull Request  

## License

This project is licensed under the MIT License.

## Acknowledgments

- Assignment specification provided by the instructor / course  
- Icons by React Icons  
- UI styling with Tailwind CSS  
- Inspiration from YouTube  