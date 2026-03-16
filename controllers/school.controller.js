import schoolService from "../services/school.service.js";
import { SchoolValidator } from "../validators/school.validator.js";
import { ValidationException } from "../exceptions/app.exception.js";
import logger from "../utils/logger.js";

export class SchoolController {
  async getSchools(req, res, next) {
    try {
      const { latitude, longitude } = req.query;

      const { error } = SchoolValidator.validateListSchools({
        latitude: Number(latitude),
        longitude: Number(longitude),
      });

      if (error) {
        throw new ValidationException(error.details[0].message);
      }

      const schools = await schoolService.listSchools(
        Number(latitude),
        Number(longitude),
      );

      return res.status(200).json({
        success: true,
        data: schools,
      });
    } catch (err) {
      logger.error("Error fetching schools", err);
      next(err);
    }
  }

  async addSchool(req, res, next) {
    try {
      const { error, value } = SchoolValidator.validateAddSchool(req.body);

      if (error) {
        throw new ValidationException(error.details[0].message);
      }

      const schoolId = await schoolService.addSchool(value);

      return res.status(201).json({
        success: true,
        message: "School added successfully",
        data: { id: schoolId },
      });
    } catch (err) {
      logger.error("Error adding school", err);
      next(err);
    }
  }
}

const schoolController = new SchoolController();
export default schoolController;
