import express from "express";
import { applyJob, getApplicants, getAppliedJob, updateStatus } from "../controller/application.controller.js"
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router= express.Router();

router.route("/apply/:id").get(isAuthenticated, applyJob);
router.route("/get").get(isAuthenticated, getAppliedJob);
router.route("/getapplicants/:id").get(isAuthenticated, getApplicants);
router.route("/status/update/:id").put(isAuthenticated, updateStatus);

export default router;