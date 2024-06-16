const express = require("express");
const router = express.Router();
const db = require("../test-db-connection");

//route for GET requests to "/fetch" to fetch module data from the database
router.get('/fetch', async (req, res) => {
    try {
      // Execute a query to fetch id and module_name from the module table
      const [rows] = await db.query('SELECT id, module_name FROM module');
      res.json(rows);
    } catch (error) {

      // Handle any errors that occur during the query execution
      console.error('Error fetching modules:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports = router;