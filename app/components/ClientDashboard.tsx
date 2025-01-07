"use client";

import React,{useEffect} from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import ButtonComponent from "../components/ui/ButtonComponent";
import axios from 'axios';


const ClientDashboard: React.FC<{ accessToken: string }> = ({ accessToken }) => {
  const router = useRouter();
  
  const handleSignOut = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    // Cookies.remove('next-auth.session-token');
    router.push('/');
  };
// if (!accessToken) {
  useEffect(() => {
    const fetchUserData = async () => {
    
      if (!accessToken) {
        router.push("/");
        return;
      }
  
      try {
        const payload = {
          client_id: process.env.NEXT_PUBLIC_AUTH_GOOGLE_CLIENT_ID,
          client_secret: process.env.NEXT_PUBLIC_AUTH_GOOGLE_CLIENT_ID_SECRET,
          grant_type: "convert_token",
          token: accessToken,
          backend: "google-oauth2",
        };
         
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/convert-token`,
          payload,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("Response data:", response.data);
       
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push("/");
      } 
    };
  
    fetchUserData();
  }, [accessToken, router]);
  
// }
  return (
    <div className="h-screen w-screen ">
      <div className="flex space-y-2">
        <nav className="flex justify-around items-center w-full p-4 bg-gray-500 text-white">
          <p className="font-semibold text-xl">Dashboard</p>
          <ButtonComponent onClick={handleSignOut}>Sign Out</ButtonComponent>
        </nav>
      </div>
      <div className="p-4">
  
      </div>
    </div>
  );
};

export default ClientDashboard;