//index.js

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const app = require('./src/app');
const mongoose = require('mongoose');

const PORT = process.env.FACULTY_PORT || 3000;

mongoose.connect(process.env.FACULTY_DATABASE_URL)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });