const express = require("express");
const createError = require("http-errors");
const Jobs = require("../Models/Jobs.model");
const { jobsSchema } = require("../helpers/validation_schema");
/**
 * Create and save a new job.
 * status - Done
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {void}
 */
const postJob = async (req, res, next) => {
  try {
    const result = await jobsSchema.validateAsync(req.body);

    if (!result) throw createError.Conflict(`Data Validation failed`);
    // Create a new job instance using the request body
    const job = new Jobs(result);

    // Save the job to the database
    const savedJob = await job.save();

    // Send the saved job as a response
    res.send({ savedJob });
  } catch (error) {
    if (error.isJoi == true)
      return next(createError.BadRequest("validation failed"));
    next(error);
  }
};

/**
 * Get a job by its ID.
 *status- Done
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function for error handling.
 * @returns {void}
 */
const getJob = async (req, res, next) => {
  try {
    // Find a job by its ID, excluding the 'openaiEmbeddings' field, and populate the 'company' field
    const job = await Jobs.findOne(
      { _id: req.params },
      { openaiEmbeddings: 0 }
    ).populate("company");

    // If the job is not found, throw a conflict error
    if (!job)
      throw createError.Conflict(
        `Job with _id: ${req.params._id} is unavailable`
      );

    // Send the job as a response
    res.send({ job });
  } catch (error) {
    // Pass the error to the next middleware for centralized error handling
    next(error);
  }
};

/**
 * Get all jobs.
 *status - add filters
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function for error handling.
 * @returns {void}
 */
const getAllJobs = async (req, res, next) => {
  try {
    // Find all jobs, excluding the 'openaiEmbeddings' field, and populate the 'company' field
    let result = await Jobs.find({}, { openaiEmbeddings: 0 }).populate(
      "company"
    );

    // Send the results as a response
    res.send({ result });
  } catch (error) {
    // Handle errors gracefully and log them
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

/**
 * Delete a job by its ID.
 *status - Done
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function for error handling.
 * @returns {void}
 */
const deleteJob = async (req, res, next) => {
  try {
    // Find and delete a job by its ID
    const job = await Jobs.findOneAndDelete({ _id: req.params });

    // If the job is not found, throw a conflict error
    if (!job)
      throw createError.Conflict(
        `Job with _id: ${req.params._id} is unavailable`
      );

    // Send the deleted job as a response
    res.send({ job });
  } catch (error) {
    // Pass the error to the next middleware for centralized error handling
    next(error);
  }
};

/**
 * Update a job by its ID.
 *status - Done
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function for error handling.
 * @returns {void}
 */
const updateJob = async (req, res, next) => {
  try {
    // Find and update a job by its ID, excluding the 'openaiEmbeddings' field, and populate the 'company' field
    const job = await Jobs.findOneAndUpdate(
      { _id: req.params },
      req.body,
      {
        new: true,
      },
      { openaiEmbeddings: 0 }
    ).populate("company");

    // If the job is not found, throw a conflict error
    if (!job)
      throw createError.Conflict(
        `Job with _id: ${req.params._id} is unavailable`
      );

    // Send the updated job as a response
    res.send({ job });
  } catch (error) {
    // Pass the error to the next middleware for centralized error handling
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
