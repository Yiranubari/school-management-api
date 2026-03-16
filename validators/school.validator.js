import joi from "joi";

export class SchoolValidator {
  static addSchoolSchema = joi.object({
    name: joi.string().required(),
    address: joi.string().required(),
    latitude: joi.number().min(-90).max(90).required(),
    longitude: joi.number().min(-180).max(180).required(),
  });

  static listSchoolsSchema = joi.object({
    latitude: joi.number().min(-90).max(90).required(),
    longitude: joi.number().min(-180).max(180).required(),
  });

  static validateAddSchool(data) {
    return this.addSchoolSchema.validate(data);
  }

  static validateListSchools(data) {
    return this.listSchoolsSchema.validate(data);
  }
}
