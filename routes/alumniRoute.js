const express = require("express");
const router = express.Router();
const alumniController = require("../controller/alumniController"); // Adjust the path as necessary
const { isAuth } = require("../middleware/auth");

// Route to create a new alumni with file upload handling
router.post("/", isAuth, alumniController.uploadAlumniFiles, alumniController.createAlumni);

// Route to get all alumni
router.get("/", alumniController.getAllAlumni);

router.get("/invitation",isAuth, alumniController.sendInvitaion);
router.get("/form-controller" , isAuth , alumniController.formController);

// Route to get an alumni by ID
router.get("/:id", alumniController.getAlumniById);

// Route to update an alumni by ID
router.put("/:id", alumniController.updateAlumni);

// Route to delete an alumni by ID
router.delete("/:id", alumniController.deleteAlumni);

router.post("/receipt",isAuth, alumniController.uploadReceiptFiles, alumniController.createReceipt);


module.exports = router;
