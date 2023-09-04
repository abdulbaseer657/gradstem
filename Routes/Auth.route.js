const express = require("express");

const router = express.Router();

const {
  authRegister,
  authLogin,
  authRefreshToken,
} = require("../controllers/auth.controller");

router.post("/register", authRegister);

router.post("/login", authLogin);

router.post("/refresh_token", authRefreshToken);

router.delete("/logout", async (req, res, next) => {});

///router.route("/").get(getalljobs).post(postjob);
//router.route("/:id").delete(deletejob).get(getjob).patch(updatejob);

module.exports = router;
