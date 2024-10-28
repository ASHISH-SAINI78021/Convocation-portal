import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Layout from '../Layout/Layout';

const Batch = () => {
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false); // Track if the form has been submitted
  const navigate = useNavigate();

  const handleSelectBatch = (batch) => {
    setSelectedBatch(batch);
  };

  const handleSubmit = () => {
    if (selectedBatch) {
      setIsSubmitted(true); // Set isSubmitted to true on first submit
      navigate(`/dashboard/main/${selectedBatch}`, { state: { batch: selectedBatch } });
    }
  };

  const handlePrevious = () => {
    navigate(-1); // Navigate to the previous page
  };

  const handleNext = () => {
    if (isSubmitted) {
      navigate('/next-page'); // Replace with your desired path for the next page
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center mt-8">
        <h1 className="text-2xl font-bold mb-4">Select Your Graduating Year</h1>
        <div className="flex gap-6">
          <button
            className={`flex items-center justify-center p-8 text-lg font-bold text-gray-800 border border-gray-300 rounded-xl cursor-pointer shadow-md transition-transform duration-200 ease-in-out w-36 h-30 ${selectedBatch === 2022 ? 'bg-red-300' : ''}`}
            onClick={() => handleSelectBatch(2022)}
          >
            Batch 2022
          </button>
          <button
            className={`flex items-center justify-center p-8 text-lg font-bold text-gray-800 border border-gray-300 rounded-xl cursor-pointer shadow-md transition-transform duration-200 ease-in-out w-36 h-30 ${selectedBatch === 2023 ? 'bg-red-300' : ''}`}
            onClick={() => handleSelectBatch(2023)}
          >
            Batch 2023
          </button>
          <button
            className={`flex items-center justify-center p-8 text-lg font-bold text-gray-800 border border-gray-300 rounded-xl cursor-pointer shadow-md transition-transform duration-200 ease-in-out w-36 h-30 ${selectedBatch === 2024 ? 'bg-red-300' : ''}`}
            onClick={() => handleSelectBatch(2024)}
          >
            Batch 2024
          </button>
        </div>
        <button
          onClick={handleSubmit}
          disabled={!selectedBatch}
          className={`mt-4 flex items-center justify-center p-4 text-lg font-bold text-white border border-red-600 rounded-lg cursor-pointer shadow-md transition-transform duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-red-400 ${!selectedBatch ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
        >
          Submit
        </button>

        {/* Previous and Next Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={handlePrevious}
            className="p-4 text-lg font-bold text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 transition-transform duration-200 ease-in-out"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={!isSubmitted} // Only enable Next button if form has been submitted
            className={`p-4 text-lg font-bold text-white rounded-lg shadow-md transition-transform duration-200 ease-in-out ${isSubmitted ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
          >
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Batch;
