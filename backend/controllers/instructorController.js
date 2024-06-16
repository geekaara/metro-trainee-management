const asyncHandler = require("express-async-handler");
const db = require("../test-db-connection"); 

// Display instructor create form on GET.
exports.instructor_get =  async (req, res) => {
  try {
    const instructors = await db.query("SELECT * FROM  instructors");
    res.status(200).json(instructors[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Display instructor create form on GET.
exports.fetchInstructorbyid =  async (req, res) => {
  const {id} = req.body;
  
  try {
    const instructorQuery = await db.query("SELECT * FROM  instructors WHERE id=?",[id]);

    const availabilityQuery = await db.query("SELECT day FROM  instructorAvailability WHERE instructorId=?",[id]);

    const qualificationQuery = await db.query("SELECT qualificationId FROM  instructorQualification WHERE instructorId=?",[id]);

  
    const availabilityValues = availabilityQuery[0].map(item => item.day);
    const qualificationValues = qualificationQuery[0].map(item => item.qualificationId);


    const instructorData = instructorQuery[0]; 

    instructorData[0].availability=availabilityValues;
    instructorData[0].qualifications=qualificationValues;
    

    res.status(200).json(instructorData);



  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};




// Handle instructor create on POST.
exports.instructor_post= async (req, res) => {
  const instructor = req.body;
  const qualifications=req.body.qualifications;
  const availability=req.body.availability;

  try {
    // Check if Employee ID already exists
    const [existingEmpId] = await db.query("SELECT id FROM instructors WHERE empId = ?", [instructor.empId]);
    if (existingEmpId.length > 0) {
      return res.status(400).json({ error: "Employee ID already exists" });
    }

    // Check if Email already exists
    const [existingEmail] = await db.query("SELECT id FROM instructors WHERE email = ?", [instructor.email]);
    if (existingEmail.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    await db.beginTransaction();

    const [basicDetailsResult, _] = await db.query("INSERT INTO instructors (empId,title,first_name,last_name,other_name,gender,contact_no,email,start_date,end_date) VALUES (?,?,?,?,?,?,?,?,?,?)", 
    [
      instructor.empId,
      instructor.title,
      instructor.first_name,
      instructor.last_name,
      instructor.other_name,
      instructor.gender,
      instructor.contact_no,
      instructor.email,
      instructor.start_date,
      instructor.end_date
    ]);

    const { insertId } = basicDetailsResult;

    //Insert qualifications
    for (const element of qualifications) {
      await db.query("INSERT INTO instructorQualification (instructorId, qualificationId) VALUES (?, ?)", [
         insertId,
          element
      ]);
    }

    // Insert availability
    for (const element of availability) {
      await db.query("INSERT INTO instructorAvailability (instructorId, day) VALUES (?, ?)", [
          insertId,
          element
      ]);
    }

    // Commit the transaction
    await db.commit();

    res.status(201).json({ message: "Instructor created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
    await db.rollback();
  }
};



// Handle instructor update on PUT.
exports.instructor_update = async (req, res) => {
  const { empId,title, first_name, last_name, other_name, gender, contact_no, email, qualifications, availability,start_date,end_date, id } = req.body;

  try {
    await db.beginTransaction();

    // Update instructor basic details
    await db.query(
      "UPDATE instructors SET empId=?, title=?, first_name=?, last_name=?, other_name=?, gender=?, contact_no=?, email=?,start_date=?,end_date=? WHERE id=?",
      [
        empId,
        title,
        first_name,
        last_name,
        other_name,
        gender,
        contact_no,
        email,
        start_date,
        end_date,
        id
      ]
    );

    // Delete existing qualifications and insert new ones
    await db.query("DELETE FROM instructorQualification WHERE instructorId=?", [id]);
    for (const element of qualifications) {
      await db.query("INSERT INTO instructorQualification (instructorId, qualificationId) VALUES (?, ?)", [
        id,
        element
      ]);
    }

    // Delete existing availability and insert new ones
    await db.query("DELETE FROM instructorAvailability WHERE instructorId=?", [id]);
    for (const element of availability) {
      await db.query("INSERT INTO instructorAvailability (instructorId, day) VALUES (?, ?)", [id, element]);
    }

    // Commit the transaction
    await db.commit();
    res.status(200).json({ message: "Instructor updated successfully" });

  } catch (error) {
    res.status(400).json({ error: error.message });
    await db.rollback();
  }
};

// Handle instructor delete on DELETE.
exports.instructor_delete = async (req, res) => {
  const { id } = req.body;  // assuming id is passed in the URL

  try {
    await db.beginTransaction();

    // Delete associated qualifications
    await db.query("DELETE FROM instructorQualification WHERE instructorId=?", [id]);

    // Delete associated availability
    await db.query("DELETE FROM instructorAvailability WHERE instructorId=?", [id]);

    // Delete instructor basic details
    await db.query("DELETE FROM instructors WHERE id=?", [id]);

    // Commit the transaction
    await db.commit();
    res.status(200).json({ message: "Instructor deleted successfully" });

  } catch (error) {
    res.status(400).json({ error: error.message });
    await db.rollback();
  }
};

// Check if Employee ID exists
exports.check_empId_exists = async (req, res) => {
  const { empId } = req.query;
  try {
    const [result] = await db.query("SELECT id FROM instructors WHERE empId = ?", [empId]);
    if (result.length > 0) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Check if Email exists
exports.check_email_exists = async (req, res) => {
  const { email } = req.query;
  try {
    const [result] = await db.query("SELECT id FROM instructors WHERE email = ?", [email]);
    if (result.length > 0) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};