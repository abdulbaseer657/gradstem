const express = require("express");
const createError = require("http-errors");
const Company = require("../Models/company.model");
const { companiesSchema } = require("../helpers/validation_schema");

/**
 * Create and save a new company.
 *
 * @param {object} req - The request object containing company data in req.body.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function for error handling.
 */
const postCompany = async (req, res, next) => {
  try {
    // Validate the request body against the 'companiesSchema'
    const result = await companiesSchema.validateAsync(req.body);

    // If validation fails, return a 'Bad Request' response
    if (!result) throw createError.Conflict(`Data Validation failed`);

    // Create a new Company instance using the validated data
    const company = new Company(result);

    // Save the company to the database
    const savedCompany = await company.save();

    // Send the saved company as a response
    res.send({ savedCompany });
  } catch (error) {
    // Handle validation errors and other errors gracefully
    if (error.isJoi == true)
      return next(createError.BadRequest("Validation failed"));
    next(error);
  }
};

/**
 * Get a company by its ID.
 *
 * @param {object} req - The request object containing the company ID in req.params.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function for error handling.
 */
const getCompany = async (req, res, next) => {
  try {
    // Find a company by its ID
    const company = await Company.findOne({ _id: req.params });

    // If the company is not found, throw a conflict error
    if (!company)
      throw createError.Conflict(`${req.params._id} is unavailable`);

    // Send the company as a response
    res.send({ company });
  } catch (error) {
    // Pass the error to the next middleware for centralized error handling
    next(error);
  }
};

/**
 * Get all companies.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function for error handling.
 */
const getAllCompanies = async (req, res, next) => {
  try {
    // Find all companies
    const companies = await Company.find();

    // If no companies are found, throw a conflict error
    if (!companies)
      throw createError.Conflict(`${req.params._id} is unavailable`);

    // Send the list of companies as a response
    res.send({ companies });
  } catch (error) {
    // Pass the error to the next middleware for centralized error handling
    next(error);
  }
};

/**
 * Delete a company by its ID.
 *
 * @param {object} req - The request object containing the company ID in req.params.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function for error handling.
 */
const deleteCompany = async (req, res, next) => {
  try {
    // Find and delete a company by its ID
    const company = await Company.findOneAndDelete({ _id: req.params });

    // If the company is not found, throw a conflict error
    if (!company)
      throw createError.Conflict(`${req.params._id} is unavailable`);

    // Send the deleted company as a response
    res.send({ company });
  } catch (error) {
    // Pass the error to the next middleware for centralized error handling
    next(error);
  }
};

/**
 * Update a company by its ID.
 *
 * @param {object} req - The request object containing the company ID in req.params and updated company data in req.body.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function for error handling.
 */
const updateCompany = async (req, res, next) => {
  try {
    // Find and update a company by its ID
    const company = await Company.findOneAndUpdate(
      { _id: req.params },
      req.body,
      { new: true }
    );

    // If the company is not found, throw a conflict error
    if (!company)
      throw createError.Conflict(`${req.params._id} is unavailable`);

    // Send the updated company as a response
    res.send({ company });
  } catch (error) {
    // Pass the error to the next middleware for centralized error handling
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
