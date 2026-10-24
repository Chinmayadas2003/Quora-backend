const express = require('express');
const mongoose = require('mongoose');
const apiRouter = require('./routes/index.js');
const errorHandler = require('./utils/index');
const { PORT } = require('./config/server.config');
const connectToDB = require('./config/db.config.js');

const app = express();

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

app.get('/', (req, res) => {
  res.json({ name: 'Quora Backend API', version: '1.0.0' });
});

app.get('/health', (req, res) => {
  const databaseConnected = mongoose.connection.readyState === 1;
  return res.status(databaseConnected ? 200 : 503).json({
    status: databaseConnected ? 'ok' : 'unavailable',
    database: databaseConnected ? 'connected' : 'disconnected',
  });
});

app.use('/api', apiRouter);
app.use(errorHandler.errorHandler);

async function startServer() {
  await connectToDB();
  return app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

if (require.main === module) {
  startServer().catch((error) => {
    console.error('Unable to start the server:', error.message);
    process.exitCode = 1;
  });
}

module.exports = { app, startServer };
