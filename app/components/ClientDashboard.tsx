"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import ButtonComponent from "../components/ui/ButtonComponent";


const ClientDashboard: React.FC<{ accessToken: string }> = ({ accessToken }) => {
  const router = useRouter();
  
  const handleSignOut = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    router.push('/');
  };
if (!accessToken) {
  console.log("No access token");
  router.push("/");
}
 
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