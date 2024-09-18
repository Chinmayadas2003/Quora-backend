const express = require('express'); // Use require for CommonJS modules
const { questionController } = require("../../controllers/index");
const questionRouter = express.Router();

// Define routes with distinct paths
questionRouter.get("/ping", questionController.pingQuestionController);
questionRouter.post("/", questionController.createQuestion);
questionRouter.get("/search", questionController.searchQuestion); // Use '/search' for searching questions
questionRouter.get("/", questionController.getAllQuestions); // Fetch all questions
questionRouter.put("/:id", questionController.updateQuestion);
questionRouter.delete("/:id", questionController.deleteQuestion);
questionRouter.post("/:id/answers", questionController.addAnswer);

module.exports = questionRouter; // Use module.exports for CommonJS modules
