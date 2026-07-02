const Event = require("../models/Event");

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 }); // Ascending order (upcoming first)
    res.status(200).json({ success: true, events });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ success: false, message: "Server error while fetching events" });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, location, organizer } = req.body;
    if (!title || !description || !date || !location || !organizer) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    
    const newEvent = await Event.create({ title, description, date, location, organizer });
    res.status(201).json({ success: true, event: newEvent });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ success: false, message: "Server error while creating event" });
  }
};

exports.rsvpEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { alumniName } = req.body;
    
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ success: false, message: "Event not found" });

    if (!event.attendees.includes(alumniName)) {
      event.attendees.push(alumniName);
      await event.save();
    }
    
    res.status(200).json({ success: true, event });
  } catch (error) {
    console.error("Error RSVPing to event:", error);
    res.status(500).json({ success: false, message: "Server error while RSVPing" });
  }
};
