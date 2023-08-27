const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema({
  companyName: {
    type: String,
  },
  h1b: {
    type: Number,
  },
});

const Company = mongoose.model("company", companySchema);
module.exports = Company;
