import joi from "joi";

const addSchoolSchema = joi.object({
  name: joi.string().required(),
  address: joi.string().required(),
  latitude: joi.number().min(-90).max(90).required(),
  longitude: joi.number().min(-180).max(180).required(),
});

const listSchoolsSchema = joi.object({
  latitude: joi.number().min(-90).max(90).required(),
  longitude: joi.number().min(-180).max(180).required(),
});

export { addSchoolSchema, listSchoolsSchema };
