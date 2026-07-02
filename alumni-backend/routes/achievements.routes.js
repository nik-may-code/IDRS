const express = require("express");
const router = express.Router();
const { getAllAchievements, createAchievement } = require("../controllers/achievements.controller");

router.get("/all", getAllAchievements);
router.post("/", createAchievement);

module.exports = router;
