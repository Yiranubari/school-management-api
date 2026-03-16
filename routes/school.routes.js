import { Router } from "express";
import schoolController from "../controllers/school.controller.js";

const router = Router();

router.get("/listSchools", (req, res, next) =>
  schoolController.getSchools(req, res, next),
);
router.post("/addSchool", (req, res, next) =>
  schoolController.addSchool(req, res, next),
);

export default router;
