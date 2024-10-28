const Alumni = require("../Model/alumni.js"); // Adjust the path as necessary
const multer = require("multer");
const path = require("path");
const fs = require('fs');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
// import makePDF from "../helper/makePdf.js";
const makePDF = require("../helper/makePdf.js");

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API, 
    api_secret: process.env.CLOUD_SECRET
});
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        console.log("incoming request:",req.query.folder)
        // Use folder path from req.body, default to 'uploads' if not provided
        const folderName = req.query.folder || 'uploads';
        
        return {
            folder: folderName,
            allowedFormats: ['jpg', 'png', 'pdf'], // Allowed file formats
        };
    },
});


const upload = multer({ storage: storage });

// Middleware to handle multipart form data, including files
module.exports.uploadAlumniFiles = upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "signature", maxCount: 1 }
]);

// Create alumni and save document with file paths
module.exports.createAlumni = async (req, res) => {
    const { ...alumniData } = req.body;
    const userId=req.user.id

    try {
        // Get file paths for photo and signature
        console.log(req.body);
        const photoPath = req.files.photo ? req.files.photo[0].path : null;
        const photoFileName = req.files.photo ? req.files.photo[0].filename : null;
        const signaturePath = req.files.signature ? req.files.signature[0].path : null;
        const signatureFileName = req.files.signature ? req.files.signature[0].filename : null;
        console.log(req.files)

        const newAlumni = new Alumni({
            user: userId,
            ...alumniData,
            photo: photoPath,
            signature: signaturePath,
            photoFileName: photoFileName,
            signatureFileName: signatureFileName
        });

        await newAlumni.save();
        res.status(201).json({ message: "Alumni registered successfully!", alumni: newAlumni });
    } catch (error) {
        console.error("Error registering alumni:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all alumni
module.exports.getAllAlumni = async (req, res) => {
    try {
        const alumni = await Alumni.find().populate("user", "email"); // Populate user field
        res.status(200).json(alumni);
    } catch (error) {
        console.error("Error fetching alumni:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get alumni by ID
module.exports.getAlumniById = async (req, res) => {
    const { id } = req.params;

    try {
        const alumni = await Alumni.findById(id).populate("user", "email");
        if (!alumni) {
            return res.status(404).json({ message: "Alumni not found" });
        }
        res.status(200).json(alumni);
    } catch (error) {
        console.error("Error fetching alumni:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update alumni by ID
module.exports.updateAlumni = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const alumni = await Alumni.findByIdAndUpdate(id, updates, { new: true });
        if (!alumni) {
            return res.status(404).json({ message: "Alumni not found" });
        }
        res.status(200).json({ message: "Alumni updated successfully!", alumni });
    } catch (error) {
        console.error("Error updating alumni:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete alumni by ID
module.exports.deleteAlumni = async (req, res) => {
    const { id } = req.params;

    try {
        const alumni = await Alumni.findByIdAndDelete(id);
        if (!alumni) {
            return res.status(404).json({ message: "Alumni not found" });
        }
        res.status(200).json({ message: "Alumni deleted successfully" });
    } catch (error) {
        console.error("Error deleting alumni:", error);
        res.status(500).json({ message: "Server error" });
    }
};


module.exports.uploadReceiptFiles = upload.single("receipt");
module.exports.createReceipt = async (req, res) => {      
    const userId=req.user.id
    try {
        if (req.file && req.file.mimetype !== 'application/pdf') {
            return res.status(400).json({ message: "Invalid file type. Please upload a PDF file." });
        }
        const receiptPath = req.file ? req.file.path : null;
        const receiptFileName = req.file ? req.file.filename : null;
        // console.log(req.file)
        const updatedReceipt = await Alumni.findOneAndUpdate(
            { user: userId }, // Find the Alumni record by userId
            { 
                receiptUrl: receiptPath, 
                receiptFileName: receiptFileName 
            }, // Update fields
            { new: true } // Return the updated document
        );

        if (!updatedReceipt) {
            return res.status(404).json({ message: "Alumni not found for the user." });
        }

        res.status(200).json({ message: "Receipt updated successfully!", receipt: updatedReceipt });
    } catch (error) {
        console.error("Error uploading receipt:", error);
        res.status(500).json({ message: "Server error" });
    }
}



module.exports.sendInvitaion = async (req, res) => {
    // const { id } = req.params;
    // console.log(req)
    const userId=req.user.id
    console.log(userId)

    try {
        const alumni = await Alumni.findOne({ user: userId }).populate("user", "email");
        if (!alumni) {
            return res.status(404).json({ message: "Alumni not found" });
        }
        // res.status(200).json(alumni);
        const pdfDataArray = await makePDF(alumni)
        const pdfBuffer = Buffer.from(pdfDataArray);
        // Define the path where you want to save the PDF
        // const filePath = path.join(__dirname, './', 'admit_card_12213082.pdf');

        // Save the PDF to the specified path
        // fs.writeFileSync(filePath, pdfBuffer);

        // console.log("PDF saved successfully at:", filePath);
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="admit_card_12213082.pdf"',
          
        });

        // console.log("PDF Buffer:", pdfBuffer);
        const base64Data = pdfBuffer.toString('base64');

        res.json({
            data: base64Data,
            filename: 'invitation.pdf'
        });

       
        // res.send(pdfBuffer);
        // res.status(200).json({ message: "Alumni deleted successfully" });
    } catch (error) {
        console.error("Error deleting alumni:", error);
        res.status(500).json({ message: error.message });
    }
};