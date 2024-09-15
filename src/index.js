const express = require('express');
const bodyParser = require("body-parser");
const apiRouter=require("./routes/index.js");
const errorHandler = require("./utils/index");
const { PORT } = require("./config/server.config");


const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to Quora Backend!');
});

app.use('/api', apiRouter);
app.use(errorHandler.errorHandler);
// Start the server
app.listen(PORT, async () => {
    console.log(`server started at  http://localhost:${PORT}/`);
    /* connectDB(); */
    //console.log('Connected to Database');
  });
