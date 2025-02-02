const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectDB } = require("./config/db.config");
const faqRoutes = require("./routes/faq.routes");
const config = require("./config/env.config");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
connectDB();

// Routes
app.use("/api/faqs", faqRoutes);

// Start Server
app.listen(config.port, () => {
  console.log(`🚀 Server running on http://localhost:${config.port}`);
});
