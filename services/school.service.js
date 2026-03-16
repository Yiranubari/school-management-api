import db from "../config/db.js";
import { calculateDistance } from "../utils/haversine.js";

class SchoolService {
  async addSchool(schoolData) {
    const { name, address, latitude, longitude } = schoolData;
    const [result] = await db.execute(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [name, address, latitude, longitude],
    );
    return result.insertId;
  }

  async listSchools(userLatitude, userLongitude) {
    const [schools] = await db.execute("SELECT * FROM schools");

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
  }
}

const schoolService = new SchoolService();
export default schoolService;
