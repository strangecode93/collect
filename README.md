# Collect

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/frontend-react-blue.svg?logo=react&logoColor=white)
![Express](https://img.shields.io/badge/backend-express-blue.svg?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/database-mongodb-green.svg?logo=mongodb&logoColor=white)
![Node.js](https://img.shields.io/badge/runtime-node.js-green.svg?logo=node.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/ui-tailwindcss-blueviolet.svg?logo=tailwindcss&logoColor=white)
![React-Hot-Toast](https://img.shields.io/badge/live%20interactivity-react--hot--toast-yellow.svg?logo=react&logoColor=white)

Collect is a responsive and interactive web application built on the MERN stack that allows users to create accounts, post content with images, interact with comments, follow other users, and enjoy a seamless social experience.

## Features

- **User Authentication**: Sign up, log in, and manage profiles.
- **Create Posts**: Add posts with images, titles, and descriptions.
- **Comment Section**: Allow users to comment on posts and view user profiles by clicking on a comment.
- **Follow/Unfollow Users**: Interact with other users by following or unfollowing them.
- **Responsive Design**: Optimized for all devices using TailwindCSS.
- **Live Interactivity**: Powered by `react-hot-toast` for instant feedback.

## Tech Stack

### Frontend
- ![React](https://img.shields.io/badge/react-19.0.0-blue.svg?logo=react&logoColor=white)
- ![TailwindCSS](https://img.shields.io/badge/tailwindcss-3.0-blueviolet.svg?logo=tailwindcss&logoColor=white)
- ![React Router](https://img.shields.io/badge/react--router-6.0-orange.svg?logo=react-router&logoColor=white)
- ![React-Hot-Toast](https://img.shields.io/badge/react--hot--toast-2.0-yellow.svg?logo=react&logoColor=white)

### Backend
- ![Node.js](https://img.shields.io/badge/node.js-16.0-green.svg?logo=node.js&logoColor=white)
- ![Express](https://img.shields.io/badge/express-4.17.1-blue.svg?logo=express&logoColor=white)

### Database
- ![MongoDB](https://img.shields.io/badge/mongodb-5.0-green.svg?logo=mongodb&logoColor=white)

### Deployment
- ![Vercel](https://img.shields.io/badge/vercel-frontend-black.svg?logo=vercel&logoColor=white)
- ![Render](https://img.shields.io/badge/render-backend-purple.svg?logo=render&logoColor=white)

## Installation and Setup

### Prerequisites
- Node.js and npm installed
- MongoDB installed or access to MongoDB Atlas

### Clone the Repository
```bash
$ git clone https://github.com/yourusername/collectify.git
$ cd collectify
```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   $ cd backend
   ```
2. Install dependencies:
   ```bash
   $ npm install
   ```
3. Create a `.env` file:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the backend server:
   ```bash
   $ npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   $ cd frontend
   ```
2. Install dependencies:
   ```bash
   $ npm install
   ```
3. Start the frontend server:
   ```bash
   $ npm start
   ```

## Usage

1. Open the application in your browser: `http://localhost:3000`.
2. Create an account or log in.
3. Create posts by adding an image, title, and description.
4. Comment on posts and interact with other users.
5. Explore user profiles and follow/unfollow users.

## Project Structure

```
collectify/
|
|-- backend/
|   |-- models/            # Mongoose schemas
|   |-- routes/            # API routes
|   |-- controllers/       # Business logic
|   |-- middleware/        # Authentication & error handling
|   |-- server.js          # Express server setup
|
|-- frontend/
|   |-- src/
|       |-- components/    # Reusable components
|       |-- pages/         # Application pages
|       |-- hooks/         # Custom React hooks
|       |-- App.js         # Main app entry point
|       |-- index.js       # React DOM rendering
|
|-- README.md              # Documentation
|-- package.json           # Project metadata
```
<!-- 
## Screenshots

![Home Page](https://via.placeholder.com/600x400)  
_Homepage displaying posts._

![Post Page](https://via.placeholder.com/600x400)  
_Comment section under a post._

![User Profile](https://via.placeholder.com/600x400)  
_Interactive user profile with follow/unfollow._ -->

## Contributing

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature-name'`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements

- [React.js](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [React-Hot-Toast](https://react-hot-toast.com/)

---

**Built with love by strange.**

