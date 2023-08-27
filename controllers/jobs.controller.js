const express = require("express");
const createError = require("http-errors");
const Jobs = require("../Models/Jobs.model");

const { jobsSchema } = require("../helpers/validation_schema");
const Company = require("../Models/company.model");

const postJob = async (req, res) => {
  try {
    const job = new Jobs(req.body);
    const savedJob = await job.save();
    res.send({ savedJob });
  } catch (error) {
    console.log(error);
  }
  //code here
  //take all data from user/admin
  //call openai
  //post job data to openai ->return embed
};

const getJob = async (req, res) => {
  //code here
};

const getAllJobs = async (req, res) => {
  //code here
  queryObject = {};
  try {
    let result = await Jobs.find().populate("company");

    //res.send({ result });
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
  }
};

const deleteJob = async (req, res) => {
  //code here
};

const updateJob = async (req, res) => {
  //code here
};

module.exports = {
  postJob,
  getJob,
  getAllJobs,
  deleteJob,
  updateJob,
};
