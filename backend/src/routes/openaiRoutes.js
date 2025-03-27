const express = require("express");
const { generateText } = require("../controllers/openaiController");

const router = express.Router();

router.post("/generate", generateText);

module.exports = router;
