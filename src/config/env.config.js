require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/faqDB",
  redisURL: process.env.REDIS_URL || "redis://localhost:6379",
  googleTranslateAPIKey: process.env.GOOGLE_TRANSLATE_API_KEY || "",
};
