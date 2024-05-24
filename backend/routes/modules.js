const express = require("express");
const router = express.Router();
const db = require("../test-db-connection");

router.get('/fetch', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT id, module_name FROM module');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching modules:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports = router;