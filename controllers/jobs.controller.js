const express = require("express");
const createError = require("http-errors");
const Jobs = require("../Models/Jobs.model");
const { jobsSchema } = require("../helpers/validation_schema");
const Company = require("../Models/company.model");

require("dotenv").config();
const axios = require("axios");
const client = axios.create({
  headers: {
    Authorization: "Bearer " + process.env.OPENAI_API_KEY,
  },
});
const postJob = async (req, res) => {
  const url = "https://api.openai.com/v1/embeddings";
  const params = {
    input: req.body.jobDescription,
    model: "text-embedding-ada-002",
  };
  client.post(url, params).then((result) => {
    req.body.openaiEmbeddings = result.data.data[0].embedding;
    console.log(result.data.data[0].embedding);
  });

  try {
    const job = new Jobs(req.body);
    const savedJob = await job.save();
    res.send({ savedJob });
  } catch (error) {
    console.log(error);
  }
};

const getJob = async (req, res) => {
  try {
    console.log(req.params);
    const job = await Jobs.findOne(
      { _id: req.params },
      { openaiEmbeddings: 0 }
    ).populate("company");
    if (!job) throw createError.Conflict(`${req.params._id} is unavailable`);
    res.send({ job });
  } catch (error) {
    next(error);
  }
};

const getAllJobs = async (req, res) => {
  //code here
  queryObject = {};
  try {
    let result = await Jobs.find({}, { openaiEmbeddings: 0 }).populate(
      "company"
    );

    //res.send({ result });
    res.send({ result });
  } catch (error) {
    console.log(error);
  }
};

const deleteJob = async (req, res, next) => {
  try {
    console.log(req.params);
    const job = await Jobs.findOneAndDelete({ _id: req.params });
    if (!job) throw createError.Conflict(`${req.params._id} is unavailable`);
    res.send({ job });
  } catch (error) {
    next(error);
  }
};

const updateJob = async (req, res) => {
  ///code needs to be changed
  try {
    console.log(req.params);
    const job = await Jobs.findOneAndUpdate(
      { _id: req.params },
      req.body,
      {
        new: true,
      },
      { openaiEmbeddings: 0 }
    ).populate("company");
    if (!job) throw createError.Conflict(`${req.params._id} is unavailable`);
    res.send({ job });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postJob,
  getJob,
  getAllJobs,
  deleteJob,
  updateJob,
};
