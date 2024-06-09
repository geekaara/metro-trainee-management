    const asyncHandler = require("express-async-handler");
    const db = require("../test-db-connection"); // Adjust the path if necessary

    exports.leave_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: leaves GET");
    });

    // Handle instructor create on POST.
    exports.leave_create_post = asyncHandler(async (req, res, next) => {
        const { instructorId, startDate, endDate, type, remarks } = req.body;
        
        try {
            const [result] = await db.query(
                "INSERT INTO leaves (instructorId, start_date, end_date, type, remarks) VALUES (?, ?, ?, ?, ?)",
                [instructorId, startDate, endDate, type, remarks]
            );
        
            res.status(201).send({
                message: "Absence added successfully!"
            });
        } catch (error) {
            console.error("Failed to add Absence:", error.message);
            res.status(500).send({ message: "Failed to add absence", error: error.message });
        }
    });
    
    
    exports.getLeavesById = asyncHandler(async (req, res, next) => {
        const { instructorId } = req.body; 
        
        try {
            
            const searchResults = await db.query(`
            SELECT 
            CONCAT(instructors.title,' ', instructors.first_name, ' ', instructors.last_name) AS instructor_name,
            leaves.start_date,
            leaves.end_date,
            leaves.type,
            leaves.remarks
            FROM instructors LEFT JOIN leaves ON instructors.id = leaves.instructorId WHERE 
            instructors.id=?;
        `, [instructorId]);
        

            
            res.status(200).json( searchResults[0] );
        } catch (error) {
            
            console.error('Error searching for leaves:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });
    


