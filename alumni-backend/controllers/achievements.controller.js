const Achievement = require("../models/Achievement");

exports.getAllAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ dateAchieved: -1 }); // Newest first
    res.status(200).json({ success: true, achievements });
  } catch (error) {
    console.error("Error fetching achievements:", error);
    res.status(500).json({ success: false, message: "Server error while fetching achievements" });
  }
};

exports.createAchievement = async (req, res) => {
  try {
    const { title, description, alumniName, dateAchieved } = req.body;
    if (!title || !description || !alumniName) {
      return res.status(400).json({ success: false, message: "Title, description, and alumniName are required" });
    }
    
    const newAchievement = await Achievement.create({ 
      title, 
      description, 
      alumniName, 
      dateAchieved: dateAchieved || new Date() 
    });
    
    res.status(201).json({ success: true, achievement: newAchievement });
  } catch (error) {
    console.error("Error creating achievement:", error);
    res.status(500).json({ success: false, message: "Server error while creating achievement" });
  }
};
