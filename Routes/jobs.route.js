const express = require("express");
const router = express.Router();

const {
  postJob,
  getJob,
  getAllJobs,
  deleteJob,
  updateJob,
} = require("../controllers/jobs.controller");

router.route("/jobs").get(getAllJobs).post(postJob);
router.route("/jobs/:id").delete(deleteJob).get(getJob).patch(updateJob);

module.exports = router;
