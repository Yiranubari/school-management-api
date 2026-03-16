import schoolService from "../services/school.service.js";
import { SchoolValidator } from "../validators/school.validator.js";
import logger from "../utils/logger.js";

export class SchoolController {
  async getSchools(req, res) {
    try {
      const { latitude, longitude } = req.query;

      const { error } = SchoolValidator.validateListSchools({
        latitude: Number(latitude),
        longitude: Number(longitude),
      });

      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
        });
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
      logger.error("Error Message", err);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  async addSchool(req, res) {
    try {
      const { error, value } = SchoolValidator.validateAddSchool(req.body);

      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
        });
      }

      const schoolId = await schoolService.addSchool(value);

      return res.status(201).json({
        success: true,
        data: { id: schoolId },
      });
    } catch (error) {
      logger.error("Error adding school", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}

const schoolController = new SchoolController();
export default schoolController;
