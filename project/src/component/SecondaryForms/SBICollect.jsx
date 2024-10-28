import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../const";
import { useAuth } from "../context/auth";

const PaymentProof = () => {
  const [transactionId, setTransactionId] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleReceiptUpload = (e) => {
    setReceipt(e.target.files[0]); // Capture the uploaded file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (transactionId && receipt) {
      setLoading(true);
      // Create a FormData object to handle the file and transaction ID
      const formData = new FormData();
      formData.append("transactionId", transactionId);
      formData.append("receipt", receipt);

      try {
        const response = await fetch(
          `${API}/api/v1/alumni/receipt?folder=receipt`,
          {
            method: "POST",
            headers: {
              Authorization: auth?.token,
            },
            body: formData,
          }
        );

        if (response.ok) {
          console.log("Transaction ID:", transactionId);
          console.log("Uploaded Receipt:", receipt);
          navigate("/dashboard/invitation");
        } else {
          const errorData = await response.json();
          console.error("Error:", errorData);
          alert("Failed to submit. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error.message);
        alert("An error occurred. Please try again.");
      }
      setLoading(false);
    } else {
      alert("Please provide both the transaction ID and receipt.");
    }
  };

  const handlePrevious = () => {
    navigate(-1); // Navigate to the previous page
  };

  const handleNext = () => {
    navigate("/dashboard/invitation"); // Replace with the actual next page path
  };

  return (
    <div
      className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10 px-4"
      style={{
        backgroundImage: "url('/background.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-xl w-full">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Convocation Payment Confirmation
        </h1>

        <p className="text-gray-600 text-center mb-8">
          For payment of registration fees, click the button below.
        </p>

        <div className="flex justify-center mb-8">
          <a
            href="https://www.onlinesbi.sbi/sbicollect/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all"
          >
            Go to SBI Collect
          </a>
        </div>

        <p className="text-gray-600 text-center mb-4">
          If you have already made the payment, please fill in the details
          below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="transactionId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Transaction ID
            </label>
            <input
              type="text"
              id="transactionId"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your Transaction ID"
              required
            />
          </div>

          <div>
            <label
              htmlFor="receiptUpload"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Upload Payment Receipt
            </label>
            <input
              type="file"
              id="receiptUpload"
              accept="application/pdf"
              onChange={handleReceiptUpload}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-[#C21717] text-white font-semibold py-3 rounded-lg shadow-md transition-all ${
              loading ? "opacity-70 cursor-wait" : ""
            }`}
            disabled={loading} // Disable button during loading
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

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
              className="p-4 text-lg font-bold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-transform duration-200 ease-in-out"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentProof;
