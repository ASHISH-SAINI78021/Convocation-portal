import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';

const RSVP = () => {
  const [response, setResponse] = useState(null); // Store user response
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (response) {
      console.log(`User responded: ${response}`);
      if(response === 'yes'){
        navigate('/dashboard/sbicollect'); // Navigate after submission
      }
      else{
        navigate('/dashboard/thankyou')
      }
    } else {
      alert('Please select an option before submitting.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4" style={{ backgroundImage: "url('/background.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Convocation RSVP Form
        </h1>
        <p className="text-gray-600 text-center mb-10">
          Will you be physically present at the convocation
        </p>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <button
            className={`p-8 text-xl font-semibold rounded-lg shadow-md transition-all ${
              response === 'yes'
                ? 'bg-blue-600 text-white scale-105'
                : 'bg-gray-50 text-blue-700 hover:bg-blue-100'
            }`}
            onClick={() => setResponse('yes')}
          >
            YES
          </button>
          <button
            className={`p-8 text-xl font-semibold rounded-lg shadow-md transition-all ${
              response === 'no'
                ? 'bg-red-600 text-white scale-105'
                : 'bg-gray-50 text-red-700 hover:bg-red-100'
            }`}
            onClick={() => setResponse('no')}
          >
            NO
          </button>
        </div>

        <button
          className="w-full py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all"
          onClick={handleSubmit}
        >
          Submit
        </button>

        <footer className="mt-8 text-center text-sm text-gray-500">
          If you have any questions, please contact us at <span className="font-semibold text-gray-700">convocation@university.com</span>.
        </footer>
      </div>
    </div>
  );
};

export default RSVP;
