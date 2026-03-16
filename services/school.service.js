import db from "../config/db.js";
import { calculateDistance } from "../utils/haversine.js";
import {
  NotFoundException,
  InternalException,
} from "../exceptions/app.exception.js";

class SchoolService {
  async addSchool(schoolData) {
    try {
      const { name, address, latitude, longitude } = schoolData;
      const [result] = await db.execute(
        "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
        [name, address, latitude, longitude],
      );
      return result.insertId;
    } catch (err) {
      throw new InternalException(err.message);
    }
  }

  async listSchools(userLatitude, userLongitude) {
    try {
      const [schools] = await db.execute("SELECT * FROM schools");

      if (schools.length === 0) {
        throw new NotFoundException("No schools found");
      }

      return schools
        .map((school) => {
          const distance = calculateDistance(
            userLatitude,
            userLongitude,
            school.latitude,
            school.longitude,
          );
          return { ...school, distance };
        })
        .sort((a, b) => a.distance - b.distance);
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      throw new InternalException(err.message);
    }
  }
}

const schoolService = new SchoolService();
export default schoolService;
