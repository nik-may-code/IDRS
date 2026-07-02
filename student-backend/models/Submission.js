const mongoose = require('mongoose');
const SubmissionSchema = new mongoose.Schema({ 
    month: String,
    count: Number
    });
module.exports = mongoose.model('Submission', SubmissionSchema);
