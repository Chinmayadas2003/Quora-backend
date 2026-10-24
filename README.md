# Quora Backend API

A learning project that models a question-and-answer service with a Node.js/Express API and MongoDB. The code separates HTTP controllers, services, repositories, and Mongoose models.

## What it includes

- User, question, answer, comment, and like endpoints
- Nested comments and answers attached to questions
- Case-insensitive question search
- Centralized error handling and structured logging
- A database-aware health endpoint

This is a portfolio/demo project. The API currently has no authentication or authorization, so its write and user-data endpoints must not be exposed to the public internet or used with real personal data.

## Run locally

Requirements: Node.js 18 or newer and a local MongoDB instance (or a MongoDB connection string).

```bash
git clone https://github.com/Chinmayadas2003/Quora-backend.git
cd Quora-backend
npm install
cp .env.example .env
npm run dev
```

Set `MONGO_URI` in `.env` to your MongoDB connection string. `ATLAS_DB_URL` is accepted as a legacy fallback. The server waits for MongoDB to connect before it starts listening. `PORT` defaults to `3000`.

Run the automated smoke tests with:

```bash
npm test
```

## Health and API base path

- `GET /` returns service metadata.
- `GET /health` returns `200` when MongoDB is connected and `503` otherwise.
- Resource routes are under `/api/v1`.

Examples:

```text
GET    /api/v1/users
POST   /api/v1/questions
GET    /api/v1/questions
GET    /api/v1/questions/search?title=database
POST   /api/v1/questions/:id/answers
GET    /api/v1/answers/:questionId
POST   /api/v1/answers/:id/comments
POST   /api/v1/comments/:parentCommentId
POST   /api/v1/likes/:type/:contentId/:userId
```

The exact required fields follow the Mongoose schemas in `src/models`. Responses use JSON and generally include `success`, `message`, and `data` fields. Use the resource identifiers returned by MongoDB for `:id` path parameters.

## Project layout

```text
src/
  config/        MongoDB and server configuration
  controllers/   HTTP request/response handlers
  errors/        Application error types
  models/        Mongoose schemas
  repositories/  Database operations
  routes/        Versioned Express routes
  services/      Business logic
  utils/         Error middleware
test/            HTTP smoke tests
```

## Current limitations

- Authentication, authorization, rate limiting, and production deployment configuration are not implemented.
- The smoke tests cover service metadata and database health behavior; they do not exercise MongoDB-backed CRUD flows.
- Use a disposable database for development and demos.
