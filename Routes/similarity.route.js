const express = require("express");

const router = express.Router();

const { resumeSimilarity } = require("../controllers/similarity.controller");

router.route("/similarity").get(resumeSimilarity);

module.exports = router;
