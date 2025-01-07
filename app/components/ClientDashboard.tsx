"use client";

import React,{useState,useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import Cookies from 'js-cookie';
import ButtonComponent from "../components/ui/ButtonComponent";
import axios from 'axios';

interface BackendResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: {
    email: string;
    first_name: string;
    last_name: string;
  };
}


const ClientDashboard: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [userData, setUserData] = useState<BackendResponse | null>(null);

  const handleSignOut = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    router.push('/');
  };
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = Cookies.get("accessToken");
        const refreshToken = Cookies.get("refreshToken");

        if (!accessToken || !refreshToken) {
          router.push("/");
          return;
        }

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/convert-token`,
          {
            client_id: process.env.NEXT_PUBLIC_AUTH_GOOGLE_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_AUTH_GOOGLE_CLIENT_ID_SECRET,
            grant_type: "convert_token",
            auth_token: accessToken, 
            backend: "google-oauth2",
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setUserData(response.data); // Save backend response
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [router]);

  return (
    <div className="h-screen w-screen ">
      <div className="flex space-y-2">
        <nav className="flex justify-around items-center w-full p-4 bg-gray-500 text-white">
          <p className="font-semibold text-xl">Dashboard</p>
          <ButtonComponent onClick={handleSignOut}>Sign Out</ButtonComponent>
        </nav>
      </div>
      <div className="p-4">
        {userData ? (
          <div>
            <h1 className="text-2xl font-bold">Welcome, {userData.user.first_name}</h1>
            <p>Email: {userData.user.email}</p>
            <p>
              Full Name: {userData.user.first_name} {userData.user.last_name}
            </p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;