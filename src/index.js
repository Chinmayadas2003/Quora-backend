const express = require('express');
const bodyParser = require("body-parser");
const apiRouter=require("./routes/index.js");
const errorHandler = require("./utils/index");
const { PORT } = require("./config/server.config");
const connectToDB = require('./config/db.config.js');


const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
app.use(bodyParser.text());

// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to Quora Backend!');
});

app.use('/api', apiRouter);
app.use(errorHandler.errorHandler);

//adding winston logging 

// Start the server
app.listen(PORT, async () => {
    console.log(`server started at  http://localhost:${PORT}/`);
    await connectToDB();
    console.log('Connected to Database');
  });
