const mongoose = require('mongoose');
const KPISchema = new mongoose.Schema({ 
    label: String, 
    value: String 
});
module.exports = mongoose.model('KPI', KPISchema);