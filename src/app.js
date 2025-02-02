const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const faqRoutes = require("./routes/faq.routes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/faqs", faqRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(3000, () => console.log("Server running on port 3000"));
