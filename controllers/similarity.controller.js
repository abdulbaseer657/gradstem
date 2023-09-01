const express = require("express");
const createError = require("http-errors");
const axios = require("axios");
const mongoose = require("mongoose");
const Jobs = require("../Models/Jobs.model");
const Company = require("../Models/company.model");
const { deleteCompany } = require("./company.controller");

//Generating OpenAi Embeddings for Job Description
const client = axios.create({
  headers: {
    Authorization: "Bearer " + process.env.OPENAI_API_KEY,
  },
});
const url = "https://api.openai.com/v1/embeddings";
const text = "artificial intelligence";
async function queryEmbedding(text) {
  try {
    const params = {
      input: text,
      model: "text-embedding-ada-002",
    };
    const response = await client.post(url, params);
    return response.data.data[0].embedding;
  } catch (error) {
    console.log(error);
  }
}
const resumeSimilarity = async (req, res) => {
  try {
    let result = await queryEmbedding(req.body.text);
    console.log(result);
    const similarJobs = await Jobs.aggregate([
      {
        $search: {
          index: "openai",
          knnBeta: {
            vector: result,
            path: "openaiEmbeddings",
            k: 5,
          },
        },
      },
      { $project: { openaiEmbeddings: 0, score: { $meta: "searchScore" } } },
      {
        $lookup: {
          from: "companies", // Replace "companies" with the actual name of your Companies collection
          localField: "company", // Field from "Jobs" collection that references Companies
          foreignField: "_id", // Field from "Companies" collection to match
          as: "company", // Alias for the joined company data
        },
      },
    ]);

    //res.send({ result });
    res.send({ similarJobs });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  resumeSimilarity,
};
