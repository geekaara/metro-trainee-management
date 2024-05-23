    const asyncHandler = require("express-async-handler");
    const db = require("../test-db-connection"); // Adjust the path if necessary

    exports.leave_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: leaves GET");
    });

    // Handle instructor create on POST.
    exports.leave_create = asyncHandler(async (req, res, next) => {
    const { userid, startdate, enddate, type, remarks} = req.body;
    
        try{
            const [result] = await db.query(
                "INSERT INTO leaves (userid, startdate, enddate, type, remarks) VALUES (?, ?, ?, ?, ?)",
                [userid, startdate, enddate, type, remarks]
            );
        
            res.status(201).send({
                message: "Instructor added successfully!"
            });
        }
    
        catch (error) {
        console.error("Failed to add Leave:", error.message);
        res.status(500).send({ message: "Failed to add leave", error: error.message });
        }
    });


