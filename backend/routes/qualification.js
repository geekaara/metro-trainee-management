const express = require("express");
const router = express.Router();
const { qualification_get, qualification_post } = require("../controllers/qualificationController");


// return all qualifications 
router.get("/fetch", qualification_get);

// add qualification create on POST.
router.post("/create", qualification_post);




module.exports = router;

