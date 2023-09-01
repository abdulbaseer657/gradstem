const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
require("dotenv").config();
require("./helpers/init_mongodb");
const AuthRoute = require("./Routes/Auth.route");
const jobs = require("./Routes/jobs.route");
const similarity = require("./Routes/similarity.route");
const companies = require("./Routes/company.route");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { verifyAccessToken } = require("./helpers/jwt_helper");

app.get("/", verifyAccessToken, async (req, res, next) => {
  console.log(req.headers["authorization"]);
  res.send("Hello from gradjobs");
});

app.use("/auth", AuthRoute);
app.use("/api/v0/", jobs, companies, similarity);

app.use(async (req, res, next) => {
  next(createError.NotFound());
});

app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
