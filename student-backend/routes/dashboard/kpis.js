const express = require('express');
const router = express.Router();
const KPI = require('../../models/KPI');

router.get('/', async (req, res) => {
  try {
    const kpis = await KPI.find();
    res.json(kpis);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching KPIs' });
  }
});

module.exports = router;