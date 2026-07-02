// controllers/notice/usernotice/create.js 

const Notice = require('../../../models/notice');
const NotificationStatus = require('../../../models/notifications/NotificationStatus');
const User = require('../../../models/user_model');
const admin = require('firebase-admin');
exports.createNotice = async (req, res) => {
  try {
    const authenticatedUserId = req.user.id;
    const { title, content } = req.body;
    let { recipients } = req.body;

    if (typeof recipients === "string") {
      try {
        recipients = JSON.parse(recipients);
      } catch (e) {
        return res.status(400).json({ message: "Invalid recipients format." });
      }
    }
    const attachment = req.file ? req.file.firebaseUrl : null;

    const notice = new Notice({
      userid: authenticatedUserId, 
      title,
      content,
      recipients,
      attachment,
    });
    let savedNotice = await notice.save();
    savedNotice = await savedNotice.populate('userid', 'name');
    
    if (Array.isArray(recipients) && (recipients.includes('Faculty')||recipients.includes('All'))) {
      const facultyUsers = await User.find({});
      for(const faculty of facultyUsers){
        const facultyId = faculty.faculty_id||faculty.userid.toString();
        await new NotificationStatus({
          faculty_id: facultyId,
          notificationId: savedNotice._id,type: 'notice', title: 'New Notice Posted',body: `New Notice Posted : ${title} `,read: false,}).save();
        if (faculty.token && typeof faculty.token === 'string' && faculty.token.length > 0) {
          try{
          const message={notification:{
            title:'New Notice Posted',body:`${title} `},data:{type:'notice',notificationId:savedNotice._id.toString(),title:'New notice Posted',body:`New Notice Posted : ${title}`},token:faculty.token,
        }
        await admin.messaging().send(message); }
        catch(error){
           console.log("..");
        }
        }
      }
    }
  res.status(201).json(savedNotice);}
   catch (err) {
    console.error("Error creating notice:", err);
    res.status(500).json({ message: "Failed to create notice. " + err.message });
  }
}