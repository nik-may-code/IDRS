const mongoose = require('mongoose');
const Document = require('./src/models/Document'); // adjust path if needed

mongoose.connect('mongodb://localhost:27017/faculty', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  const result = await Document.deleteMany({});
  console.log(`✅ Deleted ${result.deletedCount} documents from DB`);
  mongoose.disconnect();
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});
