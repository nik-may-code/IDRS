const express = require("express");
const router = express.Router();
const { getAllEvents, createEvent, rsvpEvent } = require("../controllers/events.controller");

router.get("/all", getAllEvents);
router.post("/", createEvent);
router.post("/:eventId/rsvp", rsvpEvent);

module.exports = router;
