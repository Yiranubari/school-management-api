import { Router } from "express";
import schoolController from "../controllers/school.controller.js";

const router = Router();

router.get("/listSchools", (req, res) => schoolController.getSchools(req, res));
router.post("/addSchool", (req, res) => schoolController.addSchool(req, res));

export default router;
