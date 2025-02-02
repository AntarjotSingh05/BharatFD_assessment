const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    translations: { type: Object, default: {} }, // { hi: "translated question", bn: "translated question" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("FAQ", faqSchema);
