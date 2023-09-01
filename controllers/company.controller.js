const express = require("express");
const createError = require("http-errors");
const Company = require("../Models/company.model");
const { companiesSchema } = require("../helpers/validation_schema");

const postCompany = async (req, res) => {
  //company posting code goes here
  //code needs to be updated
  try {
    const company = new Company(req.body);
    const savedCompany = await company.save();
    res.send({ savedCompany });
  } catch (error) {
    console.log(error);
  }
};

const getCompany = async (req, res, next) => {
  try {
    console.log(req.params);
    const company = await Company.findOne({ _id: req.params });
    if (!company)
      throw createError.Conflict(`${req.params._id} is unavailable`);
    res.send({ company });
  } catch (error) {
    next(error);
  }
};

const getAllCompanies = async (req, res) => {
  try {
    console.log(req.params);
    const company = await Company.find();
    if (!company)
      throw createError.Conflict(`${req.params._id} is unavailable`);
    res.send({ company });
  } catch (error) {
    next(error);
  }
};

const deleteCompany = async (req, res) => {
  try {
    console.log(req.params);
    const company = await Company.findOneAndDelete({ _id: req.params });
    if (!company)
      throw createError.Conflict(`${req.params._id} is unavailable`);
    res.send({ company });
  } catch (error) {
    next(error);
  }
};

const updateCompany = async (req, res) => {
  //this code needs to be reviewed
  try {
    console.log(req.params);
    const company = await Company.findOneAndUpdate(
      { _id: req.params },
      req.body,
      { new: true }
    );
    if (!company)
      throw createError.Conflict(`${req.params._id} is unavailable`);
    res.send({ company });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postCompany,
  getCompany,
  getAllCompanies,
  deleteCompany,
  updateCompany,
};
