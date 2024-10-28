import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import { useLocation, useNavigate } from "react-router-dom";
import styles from './MainForm.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainForm = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false); // Track if the roll number is verified
  const navigate = useNavigate();
  const { batch } = useLocation()?.state;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!rollNumber) {
      toast.info("Please enter your roll number first before verifying");
      return;
    }
    const newBatch = parseInt(batch);
    const year = parseInt(rollNumber[1] + rollNumber[2]) + 2004;

    setLoading(true);
    try {
      if (rollNumber.length > 2 && year === newBatch) {
        setIsVerified(true); // Set verification status to true
        navigate(`/dashboard/main/${batch}/${rollNumber}/form`, { state: { rollNumber, batch } });
      } else {
        toast.error("Wrong roll number or batch year");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    navigate(-1); // Navigate to the previous page
  };

  const handleNext = () => {
    if (isVerified) {
      navigate(`/dashboard/next-page`); // Replace with your next page path
    }
  };

  return (
    <Layout>
      <ToastContainer />
      <div className={styles.container}>
        <h1 className={styles.title}>Verification</h1>
        <p className={styles.subtitle}>Please verify your roll number</p>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Roll Number</label>
          <input
            type="text"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            required
            className={styles.input}
            placeholder="Enter your Roll Number"
            disabled={loading}
          />
        </div>
        <div className={styles.buttonGroup}>
          <button
            className={`${styles.button} ${loading ? styles.buttonDisabled : ''}`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </div>
      </div>

      {/* Bottom Navigation Buttons */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-between p-4 bg-white shadow-md">
        <button
          onClick={handlePrevious}
          className="p-4 text-lg font-bold text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 transition-transform duration-200 ease-in-out"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={!isVerified} // Only enable Next button if verified
          className={`p-4 text-lg font-bold text-white rounded-lg shadow-md transition-transform duration-200 ease-in-out ${isVerified ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
        >
          Next
        </button>
      </div>
    </Layout>
  );
};

export default MainForm;
