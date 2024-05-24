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
    
    
    exports.leave_search_get = asyncHandler(async (req, res, next) => {
        const { query } = req.query; 

        try {
            
            const searchResults = await db.query(`
            SELECT leaves.*, CONCAT( instructors.first_name, ' ', instructors.last_name) AS employee_name
            FROM leaves
            INNER JOIN instructors ON leaves.instructorId = instructors.id
            WHERE CONCAT( instructors.first_name, ' ', instructors.last_name) = ?
        `, [query]);

            
            res.status(200).json({ leaves: searchResults });
        } catch (error) {
            
            console.error('Error searching for leaves:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });
    


