const Joi = require(`@hapi/joi`);

const authSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(2).required(),
});
const jobsSchema = Joi.object({
  //need to write validation
});
const companiesSchema = Joi.object({
  //need to write validation
});

module.exports = {
  authSchema,
  jobsSchema,
  companiesSchema,
};
