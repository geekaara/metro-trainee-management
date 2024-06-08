const asyncHandler = require('express-async-handler');
const db = require('../test-db-connection'); 

// All Qualifiations
exports.qualification_get =  async (req, res) => {
  
  try {
    const [qualifications] = await db.query("SELECT * FROM  qualification");
    res.status(200).json(qualifications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add new Qualification
exports.qualification_post = async (req, res) => {
  const name = req.body.name;
  console.log(name)
  try {
    const qualification = await db.query("INSERT INTO qualification (qualification_name) VALUES (?)", [name]);

    const response = {
        id: qualification.id,
        qualifiation_name: qualification.qualifiation_name,
    }
    res.status(201).send({ message: "Qualification Added." });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};