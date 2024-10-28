const mongoose = require("mongoose");
const Counter = require("./counter.js");

const alumniSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    name: { type: String, required: true },
    fatherName: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    course: { type: String, required: true },
    branch: { type: String, required: true },
    enrollmentNo: { type: String, required: true },
    yearOfPassing: { type: String, required: true },
    maritalStatus: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    currentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    fieldOfWork: { type: String },
    package: { type: String },
    occupation: { type: String },
    higherStudiesCourse: { type: String },
    specialization: { type: String },
    university: { type: String },
    universityAddress: { type: String },
    employer: { type: String },
    jobDesignation: { type: String },
    officePhone: { type: String },
    officeEmail: { type: String },
    photo: { type: String, required: true },
    photoFileName: { type: String },
    signature: { type: String, required: true },
    signatureFileName: { type: String },
    receiptFileName: { type: String },
    receiptUrl: { type: String },
    rollNumber: { type: String, required: true, unique: true },
    batch: { type: String },
    department: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    employmentStatus: { type: String, required: true },
    jobs: { type: String },
    alumniId: { type: Number, default: 0 },
    typeOfEmployment: { type: String, required: true},
    jobProfile: { type: String},
});

alumniSchema.pre("save", async function (next) {
    const alumni = this;
    if (!alumni.isNew) return next();

    try {
        const counter = await Counter.findByIdAndUpdate(
            { _id: "alumniId" },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );

        alumni.alumniId = counter.seq;
        next();
    } catch (error) {
        next(error);
    }
});


const Alumni = mongoose.model("Alumni", alumniSchema);
module.exports = Alumni;
