import './App.css'
import Login from "./component/Login/Login.jsx"
import Main from './component/Main'
import { Routes, Route, useLocation } from "react-router-dom";
import Signup from './component/SignUp/Signup.jsx';
import Page from './component/Page';
import Private from './component/Routes/Private';
import Batch from './component/Batch/Batch';
import MainForm from './component/MainForm/MainForm';
import Form from './component/MainForm/Form';
import { useEffect } from 'react';
import { useAuth } from './component/context/auth';
import RSVP from './component/SecondaryForms/rsvp.jsx';
import PaymentProof from './component/SecondaryForms/SBICollect.jsx';
import Thankyou from './component/Thankyou/Thankyou';
import PdfGenerator from './component/SecondaryForms/InvitationDownload.jsx';

function App() {
  const [auth , setAuth] = useAuth();
  useEffect(() => {
    // Check if there's a token in local storage
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      const token = JSON.parse(storedAuth);
      console.log("token aaya hai:", token)
      setAuth((prev) => ({ ...prev, token }));
    } else {
        // If no token in local storage, check URL params
        const params = new URLSearchParams(window.location.search);
        console.log(params);
        const tokenFromUrl = params.get('token');
        console.log("token aaya hai:",tokenFromUrl);
        if (tokenFromUrl) {
            localStorage.setItem("auth", {token:JSON.stringify(tokenFromUrl)});
            setAuth((prev) => ({ ...prev, token: tokenFromUrl }));
        }
    }
  }, []); // Dependency array to run on mount only

  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>} /> 
        <Route path='/signup' element={<Signup/>} />
        <Route path='dashboard/*' element={<Private/>} >
          <Route path="rsvp" element={<RSVP/>} />
          <Route path="sbicollect" element={<PaymentProof/>} />
          <Route path="thankyou" element={<Thankyou/>} />
          <Route path="invitation" element={<PdfGenerator/>} />
        
        {/* <Route path='dashboard/*' > */}
          <Route path="main" element={<Batch/>} />
          <Route path="main/2022" element={<MainForm/>} />
          <Route path="main/2023" element={<MainForm/>} />
          <Route path="main/2024" element={<MainForm/>} />
          <Route path="main/2022/:rollNumber/form" element={<Form/>} />
          <Route path="main/2023/:rollNumber/form" element={<Form/>} />
          <Route path="main/2024/:rollNumber/form" element={<Form/>} />
          <Route path="*" element={<Page/>} />
        </Route>
        <Route path="*" element={<Page/>} />
      </Routes>
    </>
  )
}

export default App
