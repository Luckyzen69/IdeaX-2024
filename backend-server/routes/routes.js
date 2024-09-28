const express = require("express");
const { createUser } = require("../controllers/user");
const {
  createPlan,
  updatePlanById,
  deletePlanById,
  readPlansByAuthorId
} = require("../controllers/plan");

const {
  createDiaryEntry,
  updateDiaryEntryById,
  deleteDiaryEntryById,
  readDiariesByPlanId
} = require("../controllers/task");

const router = express.Router();

router.post("/signup", createUser);
router.post("/createPlan", createPlan);
router.put("/updatePlan/:id", updatePlanById);
router.delete("/deletePlan/:id", deletePlanById);
router.get("/readPlans/:email", readPlansByAuthorId);
router.post("/createDiaryEntry", createDiaryEntry);
router.put("/updateDiaryEntry/:id", updateDiaryEntryById);
router.delete("/deleteDiaryEntry/:id", deleteDiaryEntryById);
router.get("/readDiaries/:planId", readDiariesByPlanId);

module.exports = router;
