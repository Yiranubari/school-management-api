import schoolService from "../services/school.service";
import { SchoolValidator } from "../validators/school.validator";
import {
  ValidationException,
  InternalException,
} from "../exceptions/app.exception.js";
import logger from "../utils/logger.js";

export const getSchools = async (req, res, next) => {
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
};

export const addSchool = async (req, res, next) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    const { error } = SchoolValidator.validateAddSchool({
      name,
      address,
      latitude,
      longitude,
    });

    if (error) {
      throw new ValidationException(error.details[0].message);
    }

    const schoolId = await schoolService.addSchool({
      name,
      address,
      latitude,
      longitude,
    });

    return res.status(201).json({
      success: true,
      message: "School added successfully",
      data: { id: schoolId },
    });
  } catch (err) {
    logger.error("Error adding school", err);
    next(err);
  }
};
