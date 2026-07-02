const express = require("express");
const router = express.Router();
const {
  getAllDiscussions,
  getDiscussionById,
  createDiscussion,
  addReply,
} = require("../controllers/discussions.controller");

router.get("/all", getAllDiscussions);
router.get("/:id", getDiscussionById);
router.post("/", createDiscussion);
router.post("/:id/reply", addReply);

module.exports = router;
