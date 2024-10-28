import { useState } from "react";
import styles from "./Form.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";


const AlumniForm = () => {
  const { rollNumber, batch } = useLocation().state;
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    course: "",
    branch: "",
    enrollmentNo: "",
    yearOfPassing: "",
    mobile: "",
    email: "",
    currentAddress: "",
    permanentAddress: "",
    fieldOfWork: "",
    package: "",
    occupation: "",
    higherStudiesCourse: "",
    specialization: "",
    university: "",
    universityAddress: "",
    employer: "",
    jobDesignation: "",
    officePhone: "",
    officeEmail: "",
    photo: null,
    signature: null,
    rollNumber: rollNumber,
    batch: batch,

    department: "",
    bloodGroup: "",
    employmentStatus: "",
    prevJobs: [],
    typeOfEmployment: "",
    jobProfile: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      let maxSize = 0;

      // Set maxSize based on the input style={{padding : '7px'}} name
      if (name === "photo") {
        maxSize = 200 * 1024; // 50KB
      } else if (name === "signature") {
        maxSize = 50 * 1024; // 20KB
      }

      // Check if the file size exceeds the maxSize
      if (file && file.size > maxSize) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: `${
            name.charAt(0).toUpperCase() + name.slice(1)
          } size exceeds the maximum limit of ${maxSize / 1024}KB.`,
        }));
        return;
      } else {
        // Clear any previous error for this input style={{padding : '7px'}}
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: null,
        }));
      }

      setFormData({ ...formData, [name]: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.mobile) newErrors.mobile = "Mobile number is required.";
    if (!formData.dob) newErrors.dob = "Date of birth is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (formData.mobile.length!==10) newErrors.mobile = "Mobile number should be of 10 digits.";
    if (!formData.email.includes('@') || !formData.email.includes(".")) newErrors.email = "Invalid email.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const [previousJobs, setPreviousJobs] = useState([]);

  const handleRemovePreviousWork = (index) => {
    const updatedPreviousJobs = previousJobs.filter((_, i) => i !== index);
    setPreviousJobs(updatedPreviousJobs);
  };

  const handlePreviousJobChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPreviousJobs = [...previousJobs];
    updatedPreviousJobs[index] = {
      ...updatedPreviousJobs[index],
      [name]: value,
    };
    setPreviousJobs(updatedPreviousJobs);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    // formData.prevJobs = previousJobs;
    const newData = { ...formData, prevJobs: previousJobs };
    console.log(newData);
    const data = new FormData();
    for (const key in newData) {
      data.append(key, newData[key]);
    }

    try {
      let response = await fetch(
        "https://convocation-portal-2.onrender.com/api/v1/alumni?folder=profile",
        {
          method: "POST",
          headers: {
            Authorization: auth?.token,
          },
          body: data,
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
        // setFormData({
        //   name: '',
        //   fatherName: '',
        //   dob: '',
        //   gender: '',
        //   maritalStatus: '',
        //   course: '',
        //   branch: '',
        //   enrollmentNo: '',
        //   yearOfPassing: '',
        //   mobile: '',
        //   email: '',
        //   currentAddress: '',
        //   permanentAddress: '',
        //   fieldOfWork: '',
        //   package: '',
        //   occupation: '',
        //   higherStudiesCourse: '',
        //   specialization: '',
        //   university: '',
        //   universityAddress: '',
        //   employer: '',
        //   jobDesignation: '',
        //   officePhone: '',
        //   officeEmail: '',
        //   photo: null,
        //   signature: null,
        //   rollNumber: '',
        //   batch: '',
        // });
        setErrors({});
        localStorage.setItem("batch", formData.batch);
        navigate("/dashboard/rsvp");
      } else {
        setErrors({ submit: "Error submitting the form, please try again." });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ submit: "Error submitting the form, please try again." });
    }
    setLoading(false);
  };
  const handleAddPreviousWork = () => {
    setPreviousJobs([...previousJobs, { employer: "", jobDesignation: "" }]);
  };

  const handlePrevious = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className={styles.formContainer}>
      <form style={{height:"95vh"}} className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title} style={{ fontWeight: "bolder" }}>
          Alumni Registration Form
        </h1>

        {/* Personal Information Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Personal Information</h2>
          <label>
            Name<span className="text-red-500 pl-[0.7px] text-[15px]">*</span>
          </label>
          <input
            style={{ padding: "7px" }}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}

          <label>
            Father&apos;s Name
            <span className="text-red-500 pl-[0.7px] text-[15px]">*</span>
          </label>
          <input
            style={{ padding: "7px" }}
            type="text"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
          />

          <div className="flex md:flex-row flex-col">
            <div>
              <label>
                Date of Birth
                <span className="text-red-500 pl-[0.7px] text-[15px]">*</span>
              </label>
              <input
                style={{ padding: "7px" }}
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
            {errors.dob && <span className={styles.error}>{errors.dob}</span>}

            <div className="md:ml-20">
              <label>
                Gender
                <span className="text-red-500 pl-[0.7px] text-[15px]">*</span>
              </label>
              <div className={styles.radioGroup}>
                <label>
                  <input
                    style={{ padding: "7px" }}
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleChange}
                  />
                  Male
                </label>
                <label>
                  <input
                    style={{ padding: "7px" }}
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleChange}
                  />
                  Female
                </label>
                <label>
                  <input
                    style={{ padding: "7px" }}
                    type="radio"
                    name="gender"
                    value="other"
                    checked={formData.gender === "other"}
                    onChange={handleChange}
                  />
                  Other
                </label>
                {errors.gender && (
                  <span className={styles.error}>{errors.gender}</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex">
            <div>
              <label>
                Marital Status
                <span className="text-red-500 pl-[0.7px] text-[15px]">*</span>
              </label>
              <select
                style={{ padding: "7px" }}
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="">Select Marital Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>

            <div className="ml-12">
              <label>
                Blood Group
                <span className="text-red-500 pl-[0.7px] text-[15px]">*</span>
              </label>
              <select
                style={{ padding: "7px" }}
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>
        </section>

        {/* Academic Details Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Academic Details</h2>
          <label>
            Course<span className="text-red-500 pl-[0.7px] text-[15px]">*</span>
          </label>
          <select
            style={{ padding: "7px" }}
            name="course"
            value={formData.course}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="">Select Course</option>
            <option value="BTech">BTech</option>
            <option value="MBA">MBA</option>
            <option value="MTech">MTech</option>
            <option value="MCA">MCA</option>
          </select>

          <label>
            Branch
            <span className="text-red-500 pl-[0.7px] text-[15px]">*</span>
          </label>

          <select
            style={{ padding: "7px" }}
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="">Select Branch</option>
            <option value="Computer Science">
              Computer Science and Engineering
            </option>
            <option value="Information Technology">
              Information Technology
            </option>
            <option value="Civil">Civil</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Electrical">Electrical</option>
            <option value="Production and Industrial">
              Production and Industrial
            </option>
            <option value="Electronics and Communication">
              Electronics and Communication
            </option>
            <option value="Chemistry">Chemistry</option>
            <option value="Physics">Physics</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Computer Application">Computer Application</option>
            <option value="Business Administration">
              Business Administration
            </option>
            <option value="Humanities and Social Sciences">
              Humanities and Social Sciences
            </option>
            <option value="Renewable Energy and Efficiency">
              School of Renewable Energy and Efficiency
            </option>
          </select>

          <label>
            Enrollment No
            <span className="text-red-500 pl-[0.7px] text-[15px]">*</span>
          </label>
          <input
            style={{ padding: "7px" }}
            type="text"
            name="enrollmentNo"
            value={formData.enrollmentNo}
            onChange={handleChange}
            required
          />

          <label>
            Year of Passing
            <span className="text-red-500 pl-[0.7px] text-[15px]">*</span>
          </label>
          <input
            style={{ padding: "7px" }}
            type="text"
            name="yearOfPassing"
            value={formData.yearOfPassing}
            onChange={handleChange}
            required
          />
        </section>

        {/* Higher Studies Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Higher Studies (If applicable)
          </h2>
          <label>Course Name</label>
          <input
            style={{ padding: "7px" }}
            type="text"
            name="higherStudiesCourse"
            value={formData.higherStudiesCourse}
            onChange={handleChange}
          />

          <label>Specialization</label>
          <input
            style={{ padding: "7px" }}
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
          />

          <label>University</label>
          <input
            style={{ padding: "7px" }}
            type="text"
            name="university"
            value={formData.university}
            onChange={handleChange}
          />

          <label>University Address</label>
          <input
            style={{ padding: "7px" }}
            type="text"
            name="universityAddress"
            value={formData.universityAddress}
            onChange={handleChange}
          />
        </section>

        {/* Contact Information Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Contact Information</h2>
          <label>
            Mobile No
            <span className="text-red-500 pl-[0.7px] text-[15px]">*</span>
          </label>
          <input
            style={{ padding: "7px" }}
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
          {errors.mobile && (
            <span className={styles.error}>{errors.mobile}</span>
          )}

          <label>
            Email ID
            <span className="text-red-500 pl-[0.7px] text-[15px]">*</span>
          </label>
          <input
            style={{ padding: "7px" }}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}

          <label>
            Current Address
            <span className="text-red-500 pl-[0.7px] text-[15px]">*</span>
          </label>
          <input
            style={{ padding: "7px" }}
            type="text"
            name="currentAddress"
            value={formData.currentAddress}
            onChange={handleChange}
            required
          />

          <label>
            Permanent Address
            <span className="text-red-500 pl-[0.7px] text-[15px]">*</span>
          </label>
          <input
            style={{ padding: "7px" }}
            type="text"
            name="permanentAddress"
            value={formData.permanentAddress}
            onChange={handleChange}
            required
          />
        </section>

        {/* Professional Details Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Professional Details</h2>
          <label>
            Employment Status
            <span className="text-red-500 pl-[0.7px] text-[15px]">*</span>
          </label>
          <select
            style={{ padding: "7px" }}
            name="employmentStatus"
            value={formData.employmentStatus}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="">Select Employment Status</option>
            <option value="Employed">Employed</option>
            <option value="Self Employed">Self Employed</option>
            <option value="Unemployed">Unemployed</option>
            <option value="Other">Other</option>
          </select>

          {/* Conditionally render the text box if "Other" is selected */}
          {formData.employmentStatus === "Other" && (
            <div>
              <label>
                Please specify:
                <span className="text-red-500 pl-[0.7px] text-[15px]">*</span>
              </label>
              <input
                style={{ padding: "7px" }}
                type="text"
                name="employmentStatus"
                value={formData.employmentStatus}
                onChange={handleChange}
              />
            </div>
          )}

<label>Type of Employment
            <span className="text-red-500 pl-[0.7px] text-[15px]">*</span>
          </label>
          <select style={{ padding: "7px" }}
            name="typeOfEmployment"
            value={formData.typeOfEmployment}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="">Select Type of Employment</option>
            <option value="Government">Government</option>
            <option value="Private">Private</option>
            <option value="PSUs">PSUs</option>
            <option value="Other">Other</option>
          </select>

          {/* Conditionally render the text box if "Other" is selected */}
          {formData.typeOfEmployment === "Other" && (
            <div>
              <label>
                Please specify:
                <span className="text-red-500 pl-[0.7px] text-[15px]">*</span>
              </label>
              <input
                style={{ padding: "7px" }}
                type="text"
                name="typeOfEmployment"
                value={formData.typeOfEmployment}
                onChange={handleChange}
              />
            </div>
          )}

          <label>
            Job Profile
            <span className="text-red-500 pl-[0.7px] text-[15px]">*</span>
          </label>
          <select style={{ padding: "7px" }}
            name="jobProfile"
            value={formData.jobProfile}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="">Select Job Profile</option>
            <option value="Core Developer">Core Developer</option>
            <option value="IT">IT</option>
            <option value="Other">Other</option>
          </select>

          {/* Conditionally render the text box if "Other" is selected */}
          {formData.jobProfile === "Other" && (
            <div>
              <label>
                Please specify:
                <span className="text-red-500 pl-[0.7px] text-[15px]">*</span>
              </label>
              <input
                style={{ padding: "7px" }}
                type="text"
                name="jobProfile"
                value={formData.jobProfile} onChange={handleChange}
                />
              </div>
          )}

          <label>
            Field of Work
            <span className="text-red-500 pl-[0.7px] text-[15px]">*</span>
          </label>
          <input
            style={{ padding: "7px" }}
            type="text"
            name="fieldOfWork"
            value={formData.fieldOfWork}
            onChange={handleChange}
          />

          <label>
            Current Occupation
            <span className="text-red-500 pl-[0.7px] text-[15px]">*</span>
          </label>
          <input
            style={{ padding: "7px" }}
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
          />

          <label>
            Employer
            <span className="text-red-500 pl-[0.7px] text-[15px]">*</span>
          </label>
          <input
            style={{ padding: "7px" }}
            type="text"
            name="employer"
            value={formData.employer}
            onChange={handleChange}
          />

          <label>
            Job Designation<sup>#</sup>
            <span className="text-red-500 pl-[0.7px] text-[15px]">*</span>
          </label>
          <input
            style={{ padding: "7px" }}
            type="text"
            name="jobDesignation"
            value={formData.jobDesignation}
            onChange={handleChange}
          />
          <p>
            <sup>#</sup> Separate with comma for multiple designations
          </p>

          <label>
            Package
            <span className="text-red-500 pl-[0.7px] text-[15px]">*</span>
          </label>
          <select
            style={{ padding: "7px" }}
            name="package"
            value={formData.package}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="">Select Package</option>
            <option value="lessThan10L">Less than 10 lakh</option>
            <option value="moreThan10L">More than 10 lakh</option>
          </select>
        </section>

        {/* Button to add previous work */}
        <button
          type="button"
          onClick={handleAddPreviousWork}
          className="mb-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Add Previous Work
        </button>

        {previousJobs.map((job, index) => (
          <div
            key={index}
            className="mt-4 border-t border-gray-300 pt-4 relative"
          >
            <h3 className="font-semibold mb-2">Previous Job #{index + 1}</h3>

            {/* Remove Button */}
            <button
              type="button"
              onClick={() => handleRemovePreviousWork(index)}
              className="absolute top-0 right-0 text-red-500 hover:text-red-700"
              title="Remove"
            >
              &times;
            </button>

            <label>
              Employer
              <span className="text-red-500 pl-[0.7px] text-[15px]">*</span>
            </label>
            <input
              style={{ padding: "7px" }}
              type="text"
              name="employer"
              value={job.employer}
              onChange={(e) => handlePreviousJobChange(index, e)}
              className="border border-gray-300 rounded p-2 w-full mb-4"
            />

            <label>
              Job Designation
              <span className="text-red-500 pl-[0.7px] text-[15px]">*</span>
            </label>
            <input
              style={{ padding: "7px" }}
              type="text"
              name="jobDesignation"
              value={job.jobDesignation}
              onChange={(e) => handlePreviousJobChange(index, e)}
              className="border border-gray-300 rounded p-2 w-full mb-4"
            />
          </div>
        ))}

        {/* File Upload Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Documents Upload</h2>
          <label>
            Photo (upto 200KB)<span className="text-red-500 pl-[0.7px] text-[15px]">*</span>
          </label>
          <input
            style={{ padding: "7px" }}
            type="file"
            name="photo"
            accept="image/jpeg"
            onChange={handleChange}
          />
          {errors.photo && <span className={styles.error}>{errors.photo}</span>}

          <label>
            Signature (upto 50KB)
            <span className="text-red-500 pl-[0.7px] text-[15px]">*</span>
          </label>
          <input
            style={{ padding: "7px" }}
            type="file"
            name="signature"
            accept="image/jpeg"
            onChange={handleChange}
          />
          {errors.signature && (
            <span className={styles.error}>{errors.signature}</span>
          )}
        </section>

        <button
          type="submit"
          className={`w-full bg-[#C21717] text-white font-semibold py-3 rounded-lg shadow-md transition-all ${
            loading ? "opacity-70 cursor-wait" : ""
          }`}
          disabled={loading} // Disable button during loading
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
        {errors.submit && <span className={styles.error}>{errors.submit}</span>}

        <div className="flex gap-4 mt-6">
          <button
            onClick={handlePrevious}
            className="p-4 text-lg font-bold text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 transition-transform duration-200 ease-in-out"
          >
            Previous
          </button>
        </div>
      </form>
    </div>
  );
};

export default AlumniForm;
