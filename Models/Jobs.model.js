const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Company = require("./company.model");
const jobSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: Company,
  },
  jobTitle: {
    type: String,
    required: [true, "job title must be provided"],
  },
  jobDescription: {
    type: String,
  },
  jobId: {
    type: String,
  },
  uploadTime: {
    type: Date,
    default: Date.now(),
  },
  domain: {
    type: String,
  },
  internship: {
    type: Boolean,
  },
  openaiEmbeddings: {
    type: String,
  },
  // enum: ['ikea', 'liddy', 'caressa', 'marcos'],
  applyLink: {
    type: String,
  },
});

const Jobs = mongoose.model("jobs", jobSchema);

module.exports = Jobs;
