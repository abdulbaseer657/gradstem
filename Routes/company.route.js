const express = require("express");

const router = express.Router();

const {
  postCompany,
  getCompany,
  getAllCompanies,
  deleteCompany,
  updateCompany,
} = require("../controllers/company.controller");

router.route("/companies").get(getAllCompanies).post(postCompany);
router
  .route("./company/:id")
  .get(getCompany)
  .delete(deleteCompany)
  .patch(updateCompany);

module.exports = router;
