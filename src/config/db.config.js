const mongoose = require("mongoose");
const redis = require("redis");
const config = require("./env.config");

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  }
};


const redisClient = redis.createClient({
  url: config.redisURL,
});

redisClient.on("connect", () => console.log("✅ Redis Connected"));
redisClient.on("error", (err) => console.error("❌ Redis Error:", err));

module.exports = { connectDB, redisClient };
