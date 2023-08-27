const express = require("express");
const createError = require("http-errors");
const Company = require("../Models/company.model");
const { companiesSchema } = require("../helpers/validation_schema");

const postCompany = async (req, res) => {
  //company posting code goes here
  try {
    const company = new Company(req.body);
    const savedCompany = await company.save();
    res.send({ savedCompany });
  } catch (error) {
    console.log(error);
  }
};

const getCompany = async (req, res) => {
  //get company  code goes here
};

const getAllCompanies = async (req, res) => {
  //get all companies code here
};

const deleteCompany = async (req, res) => {
  //delete company code goes here
};

const updateCompany = async (req, res) => {
  //update company code goes here
};

module.exports = {
  postCompany,
  getCompany,
  getAllCompanies,
  deleteCompany,
  updateCompany,
};
