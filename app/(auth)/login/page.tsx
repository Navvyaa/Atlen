import { NextPage } from "next";
import React, { Suspense } from 'react';
import Navbar from "@/app/components/Navbar";
import LoginForm from "../../components/auth/LoginForm";


const Login: NextPage = () => {

  return (
    <div className="w-full">
      <Navbar />
       <Suspense fallback={<div>Loading...</div>}>
      <LoginForm email={""} />
      </Suspense>
    </div>
  );
};

export default Login;
