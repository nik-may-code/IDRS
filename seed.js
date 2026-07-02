/**
 * IDRS ERP System - Full Database Seeder
 * Seeds all 4 modules with rich dummy data.
 * Run: node seed.js
 */
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

// ─── AES Encryption helpers (must match faculty-backend) ─────────────────────
const FACULTY_ENCRYPTION_KEY = 'ss9v$L!b@p8%kH*wFz&xG+qYj^nU3aZc'; // 32 bytes
const IV_LENGTH = 16;
function encryptForFaculty(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(FACULTY_ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

// ─── DB URIs ──────────────────────────────────────────────────────────────────
const studentDbUri  = "mongodb+srv://nikhil:nikhil%4024@idrs.3bjohvf.mongodb.net/idrs-copy?retryWrites=true&w=majority";
const alumniDbUri   = "mongodb+srv://nikhil:nikhil%4024@idrs.3bjohvf.mongodb.net/alumni-module-copy?retryWrites=true&w=majority";
const facultyDbUri  = "mongodb+srv://nikhil:nikhil%4024@idrs.3bjohvf.mongodb.net/faculty-module-copy?retryWrites=true&w=majority";
const adminDbUri    = "mongodb+srv://nikhil:nikhil%4024@idrs.3bjohvf.mongodb.net/idrs_admin-copy?retryWrites=true&w=majority";

async function seed() {
  console.log("\n🌱  IDRS ERP Full Database Seeder Starting...\n");

  const studentConn = await mongoose.createConnection(studentDbUri).asPromise();
  const alumniConn  = await mongoose.createConnection(alumniDbUri).asPromise();
  const facultyConn = await mongoose.createConnection(facultyDbUri).asPromise();
  const adminConn   = await mongoose.createConnection(adminDbUri).asPromise();
  console.log("✅  Connected to all 4 databases.\n");

  const hashedPassword = await bcrypt.hash("password123", 10);
  // Faculty backend stores AES-encrypted bcrypt hashes
  const encryptedFacultyPassword = encryptForFaculty(hashedPassword);

  // ══════════════════════════════════════════════════════════════════════════
  // SCHEMAS
  // ══════════════════════════════════════════════════════════════════════════
  
  // --- Student ---
  const StudentUserSchema = new mongoose.Schema({ name: String, email: String, password: String, studentId: String, contactNumber: String, major: String });
  const CourseSchema      = new mongoose.Schema({ code: String, name: String, instructor: String });
  const ResourceSchema = new mongoose.Schema({ id: String, title: String, type: String, icon: String });
  const UnitSchema = new mongoose.Schema({ id: String, title: String, description: String, resources: [ResourceSchema] });
  const CourseDetailSchema= new mongoose.Schema({ id: String, name: String, code: String, instructor: String, units: [UnitSchema] });
  const AttendanceSchema  = new mongoose.Schema({ month: String, percent: Number });
  const SubmissionSchema  = new mongoose.Schema({ month: String, count: Number });
  const KPISchema         = new mongoose.Schema({ label: String, value: String });
  const ActivitySchema    = new mongoose.Schema({ icon: String, text: String, time: { type: Date, default: Date.now } });
  const ProgressSchema    = new mongoose.Schema({ course: String, percent: Number });
  const AnnouncementSchema= new mongoose.Schema({ message: String });

  // --- Faculty ---
  const FacultyUserSchema  = new mongoose.Schema({ name: String, faculty_id: String, password: String, email: String, mobile: String });
  const NoticeSchema       = new mongoose.Schema({ userid: mongoose.Schema.Types.ObjectId, title: String, content: String, recipients: [String], date: { type: Date, default: Date.now } });
  const InstitutionNoticeSchema = new mongoose.Schema({ title: String, content: String, date: { type: Date, default: Date.now } });
  const LeaveSchema        = new mongoose.Schema({ faculty_id: String, reason: String, from: Date, to: Date, status: { type: String, default: "Pending" } });

  // --- Admin ---
  const AdminStudentSchema = new mongoose.Schema({ rollNo: String, name: String, branch: String, batch: String, email: String, status: String, counselor: String, progress: { placementStatus: String } });
  const SupportTicketSchema= new mongoose.Schema({ email: String, subject: String, issue: String, status: { type: String, default: "Open" }, createdAt: { type: Date, default: Date.now } });

  // --- Documents (Shared Schema across modules) ---
  const DocumentSchema = new mongoose.Schema({
    documentName: String,
    documentType: String,
    filePath: String,
    originalName: String,
    date: { type: Date, default: Date.now },
    uploadedBy: String,
    faculty_id: String,
    volume: String,
    issue: String,
    pages: String,
    publication: String,
    remarks: String,
    visibility: String,
    category: String
  }, { timestamps: true });

  // --- Alumni ---
  const AlumniSchema = new mongoose.Schema({ name: String, email: { type: String, lowercase: true }, password: String, alumniId: String, contactNumber: String, graduationYear: Number, degree: String, currentPosition: String, company: String });
  AlumniSchema.pre("save", function() {
    if (!this.isModified("password")) return Promise.resolve();
    return bcrypt.genSalt(10).then(salt => bcrypt.hash(this.password, salt)).then(hash => { this.password = hash; });
  });
  const JobPostingSchema   = new mongoose.Schema({ jobTitle: String, location: String, jobType: String, description: String, responsibilities: String, qualifications: String, createdAt: { type: Date, default: Date.now } });
  const AlumniEventSchema  = new mongoose.Schema({ title: String, description: String, date: Date, location: String, organizer: String, attendees: [String] });
  const AchievementSchema  = new mongoose.Schema({ title: String, description: String, alumniName: String, dateAchieved: { type: Date, default: Date.now } });
  const ReplySchema        = new mongoose.Schema({ author: String, content: String, createdAt: { type: Date, default: Date.now } });
  const DiscussionSchema   = new mongoose.Schema({ title: String, details: String, tags: String, author: String, replies: [ReplySchema] }, { timestamps: true });

  // ══════════════════════════════════════════════════════════════════════════
  // MODELS
  // ══════════════════════════════════════════════════════════════════════════
  const StudentUser   = studentConn.model("StudentUser",   StudentUserSchema,   "users");
  const Course        = studentConn.model("Course",        CourseSchema,        "courses");
  const CourseDetail  = studentConn.model("CourseDetail",  CourseDetailSchema,  "coursedetails");
  const Attendance    = studentConn.model("Attendance",    AttendanceSchema,    "attendances");
  const Submission    = studentConn.model("Submission",    SubmissionSchema,    "submissions");
  const KPI           = studentConn.model("KPI",           KPISchema,           "kpis");
  const Activity      = studentConn.model("Activity",      ActivitySchema,      "activities");
  const Progress      = studentConn.model("Progress",      ProgressSchema,      "progresses");
  const Announcement  = studentConn.model("Announcement",  AnnouncementSchema,  "announcements");
  const StudentDocument = studentConn.model("StudentDocument", DocumentSchema,  "documents");

  const FacultyUser   = facultyConn.model("FacultyUser",   FacultyUserSchema,   "faculty_users");
  const Notice        = facultyConn.model("Notice",        NoticeSchema,        "notices");
  const InstitutionNotice = facultyConn.model("InstitutionNotice", InstitutionNoticeSchema, "institutionnotices");
  const Leave         = facultyConn.model("Leave",         LeaveSchema,         "leaves");
  const FacultyDocument = facultyConn.model("FacultyDocument", DocumentSchema,  "documents");

  const AdminStudent  = adminConn.model("AdminStudent",    AdminStudentSchema,  "students");
  const SupportTicket = adminConn.model("SupportTicket",   SupportTicketSchema, "supporttickets");

  const AlumniUser    = alumniConn.model("AlumniUser",     AlumniSchema,        "alumnis");
  const JobPosting    = alumniConn.model("JobPosting",     JobPostingSchema,    "jobpostings");
  const AlumniEvent   = alumniConn.model("Event",          AlumniEventSchema,   "events");
  const Achievement   = alumniConn.model("Achievement",    AchievementSchema,   "achievements");
  const AlumniDocument  = alumniConn.model("AlumniDocument", DocumentSchema,    "documents");
  const Discussion    = alumniConn.model("Discussion",     DiscussionSchema,    "discussions");

  // ══════════════════════════════════════════════════════════════════════════
  // SEED: STUDENT MODULE
  // ══════════════════════════════════════════════════════════════════════════
  console.log("📘  Seeding Student Module...");
  await StudentUser.deleteMany({ email: "student@kitsw.ac.in" });
  await StudentUser.create({ name: "Arjun Reddy", email: "student@kitsw.ac.in", password: hashedPassword, studentId: "KITSW-STU-001", contactNumber: "9876543210", major: "B.Tech" });

  await Course.deleteMany({});
  await Course.create([
    { code: "CS301", name: "Data Structures & Algorithms", instructor: "Dr. Ramesh Kumar" },
    { code: "CS302", name: "Operating Systems", instructor: "Prof. Ananya Sharma" },
    { code: "CS303", name: "Database Management Systems", instructor: "Dr. Vikram Nair" },
    { code: "CS304", name: "Computer Networks", instructor: "Prof. Priya Menon" },
    { code: "CS305", name: "Software Engineering", instructor: "Dr. Suresh Babu" },
  ]);

  await CourseDetail.deleteMany({});
  await CourseDetail.create({
    id: "CS301", name: "Data Structures & Algorithms", code: "CS301", instructor: "Dr. Ramesh Kumar",
    units: [
      { id: "u1", title: "Arrays & Linked Lists", description: "Fundamental linear data structures and their operations.", resources: [{ id: "r1", title: "Lecture Notes", type: "pdf", icon: "📄" }, { id: "r2", title: "Practice Problems", type: "link", icon: "🔗" }] },
      { id: "u2", title: "Trees & Graphs", description: "Hierarchical and networked data structures.", resources: [{ id: "r3", title: "Tree Visualization", type: "video", icon: "🎬" }, { id: "r4", title: "Graph Algorithms Quiz", type: "quiz", icon: "📝" }] },
      { id: "u3", title: "Sorting & Searching", description: "Core algorithms for ordering and finding data efficiently.", resources: [{ id: "r5", title: "Algorithm Comparisons", type: "pdf", icon: "📄" }] },
    ]
  });

  await Attendance.deleteMany({});
  await Attendance.create([
    { month: "Jan", percent: 92 }, { month: "Feb", percent: 88 }, { month: "Mar", percent: 95 },
    { month: "Apr", percent: 79 }, { month: "May", percent: 85 }, { month: "Jun", percent: 90 },
  ]);

  await Submission.deleteMany({});
  await Submission.create([
    { month: "Jan", count: 4 }, { month: "Feb", count: 6 }, { month: "Mar", count: 5 },
    { month: "Apr", count: 8 }, { month: "May", count: 7 }, { month: "Jun", count: 3 },
  ]);

  await KPI.deleteMany({});
  await KPI.create([
    { label: "CGPA", value: "8.7" }, { label: "Attendance", value: "88%" },
    { label: "Assignments Done", value: "33/36" }, { label: "Rank", value: "#12" },
  ]);

  await Activity.deleteMany({});
  await Activity.create([
    { icon: "📝", text: "Submitted OS Assignment 3", time: new Date(Date.now() - 3600000) },
    { icon: "📖", text: "Completed DSA Unit 2 reading", time: new Date(Date.now() - 86400000) },
    { icon: "✅", text: "Attended CN Lab session", time: new Date(Date.now() - 172800000) },
    { icon: "🏆", text: "Scored 95% in DBMS Quiz", time: new Date(Date.now() - 259200000) },
    { icon: "💬", text: "Posted a doubt in SE forum", time: new Date(Date.now() - 345600000) },
  ]);

  await Progress.deleteMany({});
  await Progress.create([
    { course: "DSA",      percent: 75 }, { course: "OS",   percent: 60 },
    { course: "DBMS",     percent: 82 }, { course: "CN",   percent: 55 },
    { course: "Software Engg", percent: 90 },
  ]);

  await Announcement.deleteMany({});
  await Announcement.create([
    { message: "Mid-semester exams scheduled from Aug 15–22. Prepare accordingly." },
    { message: "Guest lecture on Cloud Computing by Microsoft engineer on July 10." },
    { message: "Campus placement drive for TCS starts July 20. Register at the placement portal." },
    { message: "Library will remain closed on July 5 for maintenance." },
  ]);

  console.log("   ✅  Student module seeded.\n");

  // ══════════════════════════════════════════════════════════════════════════
  // SEED: FACULTY MODULE
  // ══════════════════════════════════════════════════════════════════════════
  console.log("📗  Seeding Faculty Module...");
  await FacultyUser.deleteMany({ faculty_id: "FAC001" });
  // Use AES-encrypted bcrypt hash to match faculty-backend's login flow
  const faculty = await FacultyUser.create({ name: "Dr. Ramesh Kumar", faculty_id: "FAC001", password: encryptedFacultyPassword, email: "faculty@kitsw.ac.in", mobile: "9000000001" });

  await Notice.deleteMany({});
  await Notice.create([
    { userid: faculty._id, title: "Assignment 3 Deadline Extended", content: "The deadline for DSA Assignment 3 has been extended to July 15 due to the upcoming lab exams.", recipients: ["Students"], date: new Date() },
    { userid: faculty._id, title: "Faculty Development Programme", content: "All faculty are requested to attend the FDP on AI Tools in Education on July 8, 9 AM in Seminar Hall.", recipients: ["Faculty"], date: new Date(Date.now() - 86400000) },
    { userid: faculty._id, title: "HOD Meeting Rescheduled", content: "The monthly HOD meeting has been moved to July 6 at 3 PM.", recipients: ["HOD"], date: new Date(Date.now() - 172800000) },
  ]);

  await InstitutionNotice.deleteMany({});
  await InstitutionNotice.create([
    { title: "Annual Sports Day", content: "Annual Sports Day will be held on July 25. All students and faculty are encouraged to participate.", date: new Date(Date.now() + 86400000 * 8) },
    { title: "New Academic Calendar Released", content: "The academic calendar for 2025-26 is now available on the institute portal.", date: new Date() },
  ]);

  await Leave.deleteMany({});
  await Leave.create([
    { faculty_id: "FAC001", reason: "Attending research conference in Bangalore", from: new Date(Date.now() + 86400000 * 5), to: new Date(Date.now() + 86400000 * 7), status: "Pending" },
    { faculty_id: "FAC001", reason: "Medical leave", from: new Date(Date.now() - 86400000 * 10), to: new Date(Date.now() - 86400000 * 9), status: "Approved" },
  ]);

  console.log("   ✅  Faculty module seeded.\n");

  // ══════════════════════════════════════════════════════════════════════════
  // SEED: ADMIN MODULE
  // ══════════════════════════════════════════════════════════════════════════
  console.log("📕  Seeding Admin Module...");
  await AdminStudent.deleteMany({});
  await AdminStudent.create([
    { rollNo: "22CS001", name: "Arjun Reddy",    branch: "CSE", batch: "2022-26", email: "arjun.reddy@kitsw.ac.in",    status: "Active",    counselor: "Dr. Ramesh Kumar",  progress: { placementStatus: "Placed" } },
    { rollNo: "22CS002", name: "Priya Sharma",   branch: "CSE", batch: "2022-26", email: "priya.sharma@kitsw.ac.in",   status: "Active",    counselor: "Dr. Ramesh Kumar",  progress: { placementStatus: "Not Placed" } },
    { rollNo: "22CS003", name: "Ravi Teja",      branch: "ECE", batch: "2022-26", email: "ravi.teja@kitsw.ac.in",      status: "Active",    counselor: "Prof. Ananya Sharma", progress: { placementStatus: "Not Placed" } },
    { rollNo: "21CS001", name: "Sneha Patel",    branch: "CSE", batch: "2021-25", email: "sneha.patel@kitsw.ac.in",    status: "Active",    counselor: "Dr. Vikram Nair",   progress: { placementStatus: "Placed" } },
    { rollNo: "21EC001", name: "Kiran Kumar",    branch: "ECE", batch: "2021-25", email: "kiran.kumar@kitsw.ac.in",    status: "Active",    counselor: "Prof. Priya Menon", progress: { placementStatus: "Not Placed" } },
    { rollNo: "20CS001", name: "Ananya Krishnan", branch: "CSE", batch: "2020-24", email: "ananya.k@kitsw.ac.in",      status: "Graduated", counselor: "Dr. Suresh Babu",   progress: { placementStatus: "Placed" } },
    { rollNo: "20CS002", name: "Rahul Mehta",    branch: "CSE", batch: "2020-24", email: "rahul.mehta@kitsw.ac.in",   status: "Graduated", counselor: "Dr. Suresh Babu",   progress: { placementStatus: "Placed" } },
  ]);

  await SupportTicket.deleteMany({});
  await SupportTicket.create([
    { email: "arjun.reddy@kitsw.ac.in",  subject: "Cannot access exam portal",   issue: "The exam portal shows '403 Forbidden' when I try to log in.", status: "Open" },
    { email: "priya.sharma@kitsw.ac.in", subject: "Attendance mismatch",          issue: "My attendance shows 65% but I have been present for all classes.", status: "In Progress" },
    { email: "ravi.teja@kitsw.ac.in",    subject: "Certificate not generated",    issue: "Bonafide certificate request from last week has not been processed.", status: "Resolved" },
  ]);

  console.log("   ✅  Admin module seeded.\n");

  // ══════════════════════════════════════════════════════════════════════════
  // SEED: ALUMNI MODULE
  // ══════════════════════════════════════════════════════════════════════════
  console.log("📙  Seeding Alumni Module...");
  await AlumniUser.deleteMany({});
  const alumniDoc = new AlumniUser({ name: "Test Alumni", email: "alumni@kitsw.ac.in", password: "password123", alumniId: "KITSW-2015-001", contactNumber: "9876543210", graduationYear: 2015, degree: "B.Tech", currentPosition: "Senior Software Engineer", company: "Google" });
  await alumniDoc.save();

  await JobPosting.deleteMany({});
  await JobPosting.create([
    { jobTitle: "Senior Software Engineer", location: "Bangalore (Hybrid)", jobType: "Full-Time", description: "Join our fast-growing product team. You will build scalable backend systems using Node.js and cloud platforms.", responsibilities: "Design and implement RESTful APIs. Mentor junior engineers. Participate in architecture reviews.", qualifications: "3+ years of experience with Node.js, MongoDB, and AWS. B.Tech in CS or related field." },
    { jobTitle: "Data Scientist – AI/ML", location: "Hyderabad", jobType: "Full-Time", description: "Work on cutting-edge generative AI models at TCS Research labs.", responsibilities: "Train and fine-tune large language models. Collaborate with product teams to integrate AI solutions.", qualifications: "M.Tech or strong B.Tech with published research in ML. Proficiency in Python and PyTorch." },
    { jobTitle: "Frontend Developer", location: "Remote", jobType: "Contract", description: "6-month contract role for an ed-tech startup. Work on React-based web applications.", responsibilities: "Build and maintain responsive UI components. Work closely with designers.", qualifications: "2+ years in React.js. Good understanding of CSS and state management." },
    { jobTitle: "Product Manager", location: "Pune", jobType: "Full-Time", description: "Lead product strategy and roadmap for a B2B SaaS product serving 10,000+ users.", responsibilities: "Define product requirements, run A/B experiments, and work with engineering and design.", qualifications: "MBA preferred. 3+ years in product management. Strong analytical skills." },
    { jobTitle: "Marketing Intern", location: "Bangalore", jobType: "Internship", description: "3-month paid internship at a leading marketing agency. Great learning opportunity!", responsibilities: "Assist in digital marketing campaigns and social media content creation.", qualifications: "Currently pursuing MBA or BBA. Familiarity with Google Ads and Meta Ads Manager." },
  ]);

  await AlumniEvent.deleteMany({});
  await AlumniEvent.create([
    { title: "Class of 2015 Reunion", description: "10-year reunion for the CSE batch of 2015! Join us for an evening of nostalgia, networking, and great food. Families welcome.", date: new Date(Date.now() + 86400000 * 10), location: "Main Campus Auditorium, KITSW", organizer: "Test Alumni", attendees: ["Test Alumni", "Rahul Sharma"] },
    { title: "Tech Webinar: Future of Generative AI", description: "A panel discussion featuring KITSW alumni working at OpenAI, Google DeepMind, and Microsoft Research.", date: new Date(Date.now() + 86400000 * 5), location: "Zoom (Link will be emailed)", organizer: "Alumni Association", attendees: ["Priya Patel"] },
    { title: "Annual Placement Mentorship Drive", description: "Alumni volunteers are invited to conduct mock interviews for final-year students preparing for campus placements.", date: new Date(Date.now() + 86400000 * 20), location: "KITSW Placement Hall – Building C", organizer: "Placement Cell", attendees: [] },
    { title: "Alumni Entrepreneurship Summit", description: "A full-day summit for alumni who have founded startups or are interested in the startup ecosystem. Keynote speakers, investor panels, and networking lunch.", date: new Date(Date.now() + 86400000 * 35), location: "KITSW Convention Centre", organizer: "KITSW Innovation Hub", attendees: [] },
  ]);

  await Achievement.deleteMany({});
  await Achievement.create([
    { title: "Promoted to Senior Software Engineer at Google", description: "After 3 years of hard work and two successful product launches, I've been promoted to L5! The problem-solving mindset I developed at KITSW was absolutely instrumental. Grateful to my professors.", alumniName: "Test Alumni", dateAchieved: new Date(Date.now() - 86400000 * 15) },
    { title: "Research Paper Published in IEEE Transactions", description: "My paper on 'Bias Mitigation in Large Language Models' was accepted and published in IEEE Transactions on Neural Networks. This is the culmination of 2 years of research!", alumniName: "Priya Patel", dateAchieved: new Date(Date.now() - 86400000 * 30) },
    { title: "Launched EdTech Startup – Secured Series A Funding", description: "We've crossed 100,000 users on our platform and just closed a $2M Series A round! KITSW gave me the technical foundation, and the entrepreneurship cell gave me the courage to take the leap.", alumniName: "Arjun Mehta", dateAchieved: new Date(Date.now() - 86400000 * 7) },
    { title: "Became the Youngest VP at HDFC Bank", description: "Honored to have been appointed as VP of Digital Transformation at HDFC Bank at 31. This journey started with my MBA thesis on digital banking, which originated from a project at KITSW.", alumniName: "Kavitha Nair", dateAchieved: new Date(Date.now() - 86400000 * 45) },
  ]);

  console.log("   ✅  Alumni module seeded.\n");

  // ══════════════════════════════════════════════════════════════════════════
  // SEED: DISCUSSIONS (ALUMNI)
  // ══════════════════════════════════════════════════════════════════════════
  console.log("💬  Seeding Alumni Discussions...");
  await Discussion.deleteMany({});
  await Discussion.create([
    {
      title: "Career Opportunities in Tech — What's Hot in 2025?",
      details: "With AI and cloud computing dominating the landscape, I'd love to hear from fellow alumni about which roles are seeing the most growth and which skills employers are actively seeking right now.",
      tags: "Tech",
      author: "Test Alumni",
      replies: [
        { author: "Priya Patel", content: "ML engineering and DevOps are exploding. Certifications in AWS/GCP are gold right now." },
        { author: "Arjun Mehta", content: "Totally agree — I'd also add product management with a technical background is in huge demand." },
      ],
    },
    {
      title: "Alumni Meetup in Hyderabad — Let's Plan!",
      details: "It's been years since many of us have caught up in person. I'm thinking a weekend meetup in Hyderabad — who's interested and when would work?",
      tags: "Alumni",
      author: "Kavitha Nair",
      replies: [
        { author: "Test Alumni", content: "Count me in! First weekend of August works for me." },
        { author: "Rahul Sharma", content: "Great idea. Can we pick a venue near Banjara Hills?" },
        { author: "Priya Patel", content: "I'll coordinate with the alumni association for a proper venue." },
      ],
    },
    {
      title: "Mentorship Program for 2025 Graduates",
      details: "I want to start a structured mentorship initiative where experienced alumni volunteer to guide fresh graduates through their first 6 months of job search and career planning. Any takers?",
      tags: "Mentorship",
      author: "Arjun Mehta",
      replies: [
        { author: "Test Alumni", content: "I'm happy to mentor students interested in software engineering at Google-scale companies." },
        { author: "Kavitha Nair", content: "I can mentor those interested in BFSI and fintech." },
      ],
    },
    {
      title: "Entrepreneurship & Startups — Share Your Journey",
      details: "For those who've taken the startup plunge — what were the biggest challenges? Would you do it again? Looking to learn from your experiences before I make the leap myself.",
      tags: "Startup",
      author: "Rahul Sharma",
      replies: [
        { author: "Arjun Mehta", content: "The hardest part was fundraising. Build your network before you need it — don't wait until you're pitching." },
      ],
    },
    {
      title: "Best Online Courses & Certifications Worth Doing in 2025",
      details: "There's so much out there — Coursera, Udemy, LinkedIn Learning, Google Certs. Which ones have actually helped you grow professionally? Share your top picks!",
      tags: "Tech",
      author: "Priya Patel",
      replies: [
        { author: "Test Alumni", content: "Google's Professional Data Engineer cert was well worth the time. Directly led to a project at work." },
        { author: "Rahul Sharma", content: "Andrew Ng's ML Specialization on Coursera is a must-do for anyone getting into AI." },
        { author: "Kavitha Nair", content: "For finance folks — the CFA Level 1 prep materials on Kaplan are excellent." },
      ],
    },
  ]);
  console.log("   ✅  Alumni discussions seeded.\n");

  // ══════════════════════════════════════════════════════════════════════════
  // SEED: DOCUMENTS (ALL MODULES)
  // ══════════════════════════════════════════════════════════════════════════
  console.log("📄  Seeding Documents (Student, Faculty, Alumni)...");
  
  // Clean documents
  await StudentDocument.deleteMany({});
  await FacultyDocument.deleteMany({});
  await AlumniDocument.deleteMany({});

  // Seed Student Documents
  await StudentDocument.create([
    {
      documentName: "Semester 3 Marksheet",
      documentType: "Marksheet",
      category: "Academic",
      uploadedBy: "student@kitsw.ac.in",
      filePath: "https://firebasestorage.googleapis.com/v0/b/idrs-demo/o/sem3_marksheet.pdf",
      originalName: "sem3_marksheet.pdf",
      date: new Date("2026-06-01T09:00:00Z"),
    },
    {
      documentName: "Google Cloud Cloud Digital Leader Certificate",
      documentType: "Certificate",
      category: "Co-Curricular",
      uploadedBy: "student@kitsw.ac.in",
      filePath: "https://firebasestorage.googleapis.com/v0/b/idrs-demo/o/gcp_certification.pdf",
      originalName: "gcp_certification.pdf",
      date: new Date("2026-06-15T14:30:00Z"),
    }
  ]);

  // Seed Faculty Documents
  await FacultyDocument.create([
    {
      documentName: "Research Paper: Deep Learning in Healthcare",
      documentType: "Research Paper",
      type: "International",
      publication: "IEEE Journal of Biomedical Informatics",
      volume: "18",
      issue: "4",
      pages: "112-120",
      faculty_id: "FAC001",
      filePath: "https://firebasestorage.googleapis.com/v0/b/idrs-demo/o/dl_healthcare.pdf",
      originalName: "dl_healthcare.pdf",
      date: new Date("2026-05-10T10:00:00Z"),
      remarks: "Awarded Best Paper of the Session",
      visibility: "Public"
    },
    {
      documentName: "Patent Certificate: IoT-Based Smart Irrigation",
      documentType: "Patent",
      type: "National",
      publication: "Indian Patent Gazette",
      volume: "2026",
      issue: "22",
      pages: "1-15",
      faculty_id: "FAC001",
      filePath: "https://firebasestorage.googleapis.com/v0/b/idrs-demo/o/patent_irrigation.pdf",
      originalName: "patent_irrigation.pdf",
      date: new Date("2026-05-20T11:00:00Z"),
      remarks: "Patent Application No. 202641012345",
      visibility: "Public"
    }
  ]);

  // Seed Alumni Documents
  await AlumniDocument.create([
    {
      documentName: "Official Offer Letter - Google Bangalore",
      documentType: "Offer Letter",
      uploadedBy: "alumni@kitsw.ac.in",
      filePath: "https://firebasestorage.googleapis.com/v0/b/idrs-demo/o/google_offer_letter.pdf",
      originalName: "google_offer_letter.pdf",
      date: new Date("2026-04-20T16:00:00Z"),
    },
    {
      documentName: "Graduation Degree Certificate",
      documentType: "Degree Certificate",
      uploadedBy: "alumni@kitsw.ac.in",
      filePath: "https://firebasestorage.googleapis.com/v0/b/idrs-demo/o/degree_certificate.pdf",
      originalName: "degree_certificate.pdf",
      date: new Date("2026-04-12T10:15:00Z"),
    }
  ]);

  console.log("   ✅  Document modules seeded.\n");

  // ─── Final Summary ─────────────────────────────────────────────────────────
  console.log("═══════════════════════════════════════════════════════════");
  console.log("🎉  ALL MODULES SEEDED SUCCESSFULLY!");
  console.log("═══════════════════════════════════════════════════════════");
  console.log("\n🔑  TEST CREDENTIALS (all passwords: password123)");
  console.log("  Admin Portal  → username: admin  | password: admin123");
  console.log("  Faculty       → faculty_id: FAC001");
  console.log("  Student       → email: student@kitsw.ac.in");
  console.log("  Alumni        → email: alumni@kitsw.ac.in");
  console.log("═══════════════════════════════════════════════════════════\n");
  process.exit(0);
}

seed().catch(err => {
  console.error("❌ Seeding Error:", err.message);
  process.exit(1);
});
