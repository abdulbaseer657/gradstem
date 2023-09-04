const Joi = require(`@hapi/joi`);

const authSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(2).required(),
});
const jobsSchema = Joi.object({
  jobTitle: Joi.string().required(),
  jobDescription: Joi.string().required(),
  applyLink: Joi.string().required(),
  domain: Joi.string(),
  company: Joi.string().required(),
  jobid: Joi.string(),
});
const companiesSchema = Joi.object({
  companyName: Joi.string().required(),
  h1b: Joi.number().required(),
});

module.exports = {
  authSchema,
  jobsSchema,
  companiesSchema,
};
