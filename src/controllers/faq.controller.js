const FAQ = require("../models/faq.model");
const { translateText } = require("../utils/translation");
const redisClient = require("../config/redis.config");

// Get FAQs (with Redis caching)
exports.getFAQs = async (req, res) => {
  try {
    const lang = req.query.lang || "en";

    // Check Redis Cache
    const cacheKey = `faqs_${lang}`;
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) return res.json(JSON.parse(cachedData));

    // Fetch FAQs from DB
    const faqs = await FAQ.find();
    const translatedFAQs = faqs.map((faq) => ({
      question: faq.translations[lang] || faq.question,
      answer: faq.answer,
    }));

    // Store in Cache
    redisClient.set(cacheKey, JSON.stringify(translatedFAQs), "EX", 3600);
    res.json(translatedFAQs);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create FAQ (with automatic translation)
exports.createFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const faq = new FAQ({ question, answer, translations: {} });

    // Auto-translate into multiple languages
    const languages = ["hi", "bn"];
    for (const lang of languages) {
      faq.translations[lang] = await translateText(question, lang);
    }

    await faq.save();
    res.status(201).json({ message: "FAQ Created" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create FAQ" });
  }
};

// Delete FAQ
exports.deleteFAQ = async (req, res) => {
  try {
    await FAQ.findByIdAndDelete(req.params.id);
    res.json({ message: "FAQ Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete FAQ" });
  }
};
