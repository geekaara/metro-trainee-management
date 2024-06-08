const asyncHandler = require("express-async-handler");
const db = require("../test-db-connection"); // Adjust the path if necessary

// Display instructor create form on GET.
exports.instructor_get =  async (req, res) => {
  try {
    const instructors = await db.query("SELECT * FROM  instructors");
    res.status(200).json(instructors[0]);
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

