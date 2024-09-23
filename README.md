

---

# Quora Backend Service

This is a simple backend service for a Quora-like platform built using Node.js, Express, and MongoDB. It provides functionality for managing **users**, **questions**, **answers**, **comments**, and **likes**, allowing you to create, update, retrieve, and delete these resources.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Service](#running-the-service)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Logging](#logging)

## Features

- **Users**: Create, retrieve, update, and delete user profiles.
- **Questions**: Post questions, fetch all questions, update, and delete questions.
- **Answers**: Submit answers to questions, fetch all answers, update, and delete answers.
- **Comments**: Add comments to questions, answers, or other comments, retrieve all comments, update, and delete them.
- **Likes**: Like or dislike questions, answers, or comments. Retrieve all likes for specific content.
- **Search**: Search for questions or answers using partial matching with case insensitivity.

## Project Structure

```
quora-backend/
│
├── src/
│   ├── controllers/
│   │   ├── user.controller.js
│   │   ├── question.controller.js
│   │   ├── answer.controller.js
│   │   ├── comment.controller.js
│   │   └── like.controller.js
│   ├── services/
│   │   ├── user.service.js
│   │   ├── question.service.js
│   │   ├── answer.service.js
│   │   ├── comment.service.js
│   │   └── like.service.js
│   ├── repositories/
│   │   ├── user.repository.js
│   │   ├── question.repository.js
│   │   ├── answer.repository.js
│   │   ├── comment.repository.js
│   │   └── like.repository.js
│   ├── models/
│   │   ├── user.model.js
│   │   ├── question.model.js
│   │   ├── answer.model.js
│   │   ├── comment.model.js
│   │   └── like.model.js
│   ├── errors/
│   │   ├── base.error.js
│   │   └── notfound.error.js
│   └── config/
│       └── logger.config.js
│
├── .env
├── package.json
└── README.md
```

## Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (A running instance, either local or cloud-based like MongoDB Atlas)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/quora-backend.git
   cd quora-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your `.env` file with the required environment variables (e.g., database URL, port):
   ```
   MONGO_URI=mongodb://localhost:27017/quora
   PORT=3000
   ```

## Running the Service

1. Start the MongoDB server (if running locally):
   ```bash
   mongod
   ```

2. Run the backend service:
   ```bash
   npm start
   ```

3. The service will start on `http://localhost:3000`.

## API Endpoints

### User Endpoints

- **Create User**: `POST /users`
- **Get All Users**: `GET /users`
- **Update User**: `PUT /users/:id`
- **Delete User**: `DELETE /users/:id`

### Question Endpoints

- **Create Question**: `POST /questions`
- **Get All Questions**: `GET /questions`
- **Search Questions**: `GET /questions/search`
- **Update Question**: `PUT /questions/:id`
- **Delete Question**: `DELETE /questions/:id`

### Answer Endpoints

- **Get All Answers**: `GET /answers/:questionId`
- **Update Answer**: `PUT /answers/:id`
- **Delete Answer**: `DELETE /answers/:id`

### Comment Endpoints

- **Add Comment to Comment**: `POST /comments/:id`
- **Get All Comments for Comment**: `GET /comments/:id`
- **Update Comment**: `PUT /comments/:id`
- **Delete Comment**: `DELETE /comments/:id`
- **Delete Nested Comment**: `DELETE /comments/:parent_id/:id`

### Like Endpoints

- **Like a Question/Answer/Comment**: `POST /likes/:type/:type_id/:id`
- **Get All Likes for Question/Answer/Comment**: `GET /likes/:type/:type_id/:id/getlikes`
- **Dislike (Remove Like)**: `DELETE /likes/:id/dislikes`

### Sample API Call (Create User)

**Request**:
```bash
POST /users
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "bio": "Software developer at XYZ"
}
```

**Response**:
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "username": "john_doe",
    "email": "john@example.com",
    "bio": "Software developer at XYZ",
    "_id": "60c72b1f4f1a4d0021a4d3e2"
  }
}
```

### Sample API Call (Add Comment to a Comment)

**Request**:
```bash
POST /comments/:id
Content-Type: application/json

{
  "text": "This is a reply to your comment",
  "user_id": "60c72b1f4f1a4d0021a4d3e2"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Comment added to Comment Successfully",
  "data": {
    "text": "This is a reply to your comment",
    "user_id": "60c72b1f4f1a4d0021a4d3e2",
    "_id": "60c72b1f4f1a4d0021a4d3e4"
  }
}
```

### Sample API Call (Like a Question)

**Request**:
```bash
POST /likes/questions/605c72b1f4f1a4d0021a4d3e/604c72a3b1f5a4d001a2d1b5
```

**Response**:
```json
{
  "success": true,
  "message": "Liked the 605c72b1f4f1a4d0021a4d3e",
  "data": {
    "_id": "605c72b1f4f1a4d0021a4d3e",
    "user_id": "604c72a3b1f5a4d001a2d1b5",
    "type": "questions",
    "type_id": "605c72b1f4f1a4d0021a4d3e"
  }
}
```

## Error Handling

The service includes centralized error handling using custom error classes:

- **NotFoundError**: Thrown when a requested resource (user, question, answer, comment, or like) is not found.
- **BaseError**: A general error class from which other custom errors extend.

For example, if a user is not found, the response will look like:
```json
{
  "success": false,
  "message": "The requested resource: User with value 123 not found",
  "details": {
    "resourceName": "User",
    "resourceValue": "123"
  }
}
```

## Logging

The service uses **Winston** for logging. Logs are printed to the console and include:

- **Info**: Successful operations (e.g., question created).
- **Warning**: When an entity is not found (e.g., user not found for deletion).
- **Error**: When something goes wrong (e.g., database failure).

The logger configuration is located in `src/config/logger.config.js`.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
