const express = require("express");
const { getFAQs, createFAQ, deleteFAQ } = require("../controllers/faq.controller.js");

const router = express.Router();

router.get("/", getFAQs);
router.post("/", createFAQ);
router.delete("/:id", deleteFAQ);

module.exports = router;
