const express = require("express");

const router = express.Router();

const {
  authRegister,
  authLogin,
  authRefreshToken,
  authLogout,
} = require("../controllers/auth.controller");

router.post("/register", authRegister);

router.post("/login", authLogin);

router.post("/refresh_token", authRefreshToken);

router.delete("/logout", authLogout);

///router.route("/").get(getalljobs).post(postjob);
//router.route("/:id").delete(deletejob).get(getjob).patch(updatejob);

module.exports = router;
