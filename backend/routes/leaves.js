const express = require("express");
const router = express.Router();
const leaveController = require("../controllers/leaveController");

//route for GET requests to "/fetch" that uses the leave_get method from the leaveController
router.get("/fetch", leaveController.leave_get);

//route for POST requests to "/create" that uses the leave_create_post method from the leaveController
router.post("/create", leaveController.leave_create_post);

//route for POST requests to "/fetchbyid" that uses the getLeavesById method from the leaveController
router.post("/fetchbyid", leaveController.getLeavesById);

module.exports = router;