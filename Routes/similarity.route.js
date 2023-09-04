const express = require("express");

const router = express.Router();

const { resumeSimilarity } = require("../controllers/similarity.controller");
const { verifyAccessToken } = require("../helpers/jwt_helper");

router.route("/similarity").get(resumeSimilarity);

module.exports = router;
