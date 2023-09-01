const mongoose = require("mongoose");
const axios = require("axios");
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
    type: Array,
    default: "",
  },
  // enum: ['ikea', 'liddy', 'caressa', 'marcos'],
  applyLink: {
    type: String,
  },
});

//Generating OpenAi Embeddings for Job Description
const client = axios.create({
  headers: {
    Authorization:
      "Bearer " + "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",
  },
});
const url = "https://api.openai.com/v1/embeddings";

jobSchema.pre("save", async function (next) {
  try {
    const params = {
      input: `The Job Title for this job is : ${this.jobTitle}  The JOb Description is : ${this.jobDescription} This company is looking for skills in  ${this.domain}`,
      model: "text-embedding-ada-002",
    };
    console.log(params.input);
    const response = await client.post(url, params);
    const embed = response.data.data[0].embedding;
    this.openaiEmbeddings = embed;
    next();
  } catch (error) {
    next(error);
  }
});

const Jobs = mongoose.model("jobs", jobSchema);

module.exports = Jobs;
