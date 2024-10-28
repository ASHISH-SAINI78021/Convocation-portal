import React, { useEffect, useState } from 'react'
import { Outlet } from "react-router-dom";
import Page from '../Page';
import { useAuth } from '../context/auth';
import { API } from '../../const';

const Private = () => {
    const [ok, setok] = useState(false);
    const [auth , setAuth] = useAuth();
    // useEffect(() => {
    //   // Check if there's a token in local storage
    //   const storedAuth = localStorage.getItem("auth");
    //   if (storedAuth) {
    //     const token = JSON.parse(storedAuth);
    //     console.log("token aaya hai:", token)
    //     setAuth((prev) => ({ ...prev, token }));
    //   } else {
    //       // If no token in local storage, check URL params
    //       const params = new URLSearchParams(window.location.search);
    //       console.log(params);
    //       const tokenFromUrl = params.get('token');
    //       console.log("token aaya hai:",tokenFromUrl);
    //       if (tokenFromUrl) {
    //           localStorage.setItem("auth", {token:JSON.stringify(tokenFromUrl)});
    //           setAuth((prev) => ({ ...prev, token: tokenFromUrl }));
    //       }
    //   }
    // }, []); // Dependency array to run on mount only

    useEffect(() => {
      const init = async () => {
        try {
          let response = await fetch(
            `${API}/api/v1/auth/get-session`,
            {
              method: "GET" ,
              headers : {
                "Authorization" : auth?.token
              }
            }
          );
          console.log("if response was ok:",response)
          if (response.ok){
            response = await response.json();
            console.log(response);
            if (response.success){
              setok(true);
            }
            else {
              setok(false);
            }
          }
        } catch (err) {
          console.log(err);
        }
      };
  
      if (auth?.token) init();
    }, [auth?.token]);
  
  
    return <div>
      <Outlet/>
      {/* {
        (ok) ? <Outlet/> : <Page/>
      } */}
    </div>;
  };
  
  export default Private;
  
