
import React from 'react';
import html2pdf from 'html2pdf.js';
import {API} from '../../const';
import { useAuth } from '../context/auth';
const PdfGenerator = () => {
    const [auth, setAuth] = useAuth();
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        
        getInvitation();
       
    }, [auth?.token]);
    const getInvitation = async () => {
    try {
      setLoading(true);
      console.log(auth)
      const response = await fetch(`${API}/api/v1/alumni/invitation`, {
        method: "GET",
        headers: {
          Authorization: auth?.token,
        },
      });

      if (response.ok) {
        // Create a Blob from the PDF response
        console.log(response);
        const data=await response.json();
        console.log(data)
        const byteCharacters = atob(data.data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = data.filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert("Failed to get invitation. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
    setLoading(false);
   
  };


  
    return (
        <div className="flex flex-col items-center justify-center p-6">
    {loading ? (
        <div className="flex items-center">
            <div className="animate-spin h-8 w-8 border-4 border-t-4 border-t-blue-500 border-gray-200 rounded-full mr-3"></div>
            <div className="text-lg text-gray-700">Your Invitation Card is being generated...</div>
        </div>
    ) : (
        <div className="text-green-600 font-bold text-lg">Downloaded Successfully!</div>
    )}
</div>

    );
};

export default PdfGenerator;
