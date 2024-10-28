import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Layout from '../Layout/Layout';

const Batch = () => {
  const [selectedBatch, setSelectedBatch] = useState(null);
  const navigate = useNavigate();

  const handleSelectBatch = (batch) => {
    setSelectedBatch(batch);
  };

  const handleSubmit = () => {
    if (selectedBatch) {
      navigate(`/dashboard/main/${selectedBatch}`, { state: { batch: selectedBatch } });
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center mt-8">
        <h1 className="text-2xl font-bold mb-4">Select Your Graduating Year</h1>
        <div className="flex gap-6 md:flex-row flex-col">
          <button
            className={`flex items-center justify-center p-8 text-lg font-bold text-gray-800 border border-gray-300 rounded-xl cursor-pointer shadow-md transition-transform duration-200 ease-in-out w-36 h-30 ${selectedBatch === 2022 ? 'bg-red-300' : 'bg-white'}`}
            onClick={() => handleSelectBatch(2022)}
          >
            Batch 2022
          </button>
          <button
            className={`flex items-center justify-center p-8 text-lg font-bold text-gray-800 border border-gray-300 rounded-xl cursor-pointer shadow-md transition-transform duration-200 ease-in-out w-36 h-30 ${selectedBatch === 2023 ? 'bg-red-300' : 'bg-white'}`}
            onClick={() => handleSelectBatch(2023)}
          >
            Batch 2023
          </button>
          <button
            className={`flex items-center justify-center p-8 text-lg font-bold text-gray-800 border border-gray-300 rounded-xl cursor-pointer shadow-md transition-transform duration-200 ease-in-out w-36 h-30 ${selectedBatch === 2024 ? 'bg-red-300' : 'bg-white'}`}
            onClick={() => handleSelectBatch(2024)}
          >
            Batch 2024
          </button>
        </div>
        <button
          onClick={handleSubmit}
          disabled={!selectedBatch} // Disable button if no batch is selected
          className={`mt-4 flex items-center justify-center p-4 text-lg font-bold text-white border border-red-600 rounded-lg cursor-pointer shadow-md transition-transform duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-red-400 ${!selectedBatch ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
        >
          Submit
        </button>
      </div>
    </Layout>
  );
}

export default Batch;
