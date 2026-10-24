const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  PORT: Number(process.env.PORT || 3000),
  MONGO_URI: process.env.MONGO_URI || process.env.ATLAS_DB_URL,
  NODE_ENV: process.env.NODE_ENV || "development",
};
