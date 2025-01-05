import { NextPage } from "next";
import React, { Suspense } from 'react';

import Navbar from "@/app/components/Navbar";
import RegisterForm from "@/app/components/auth/RegisterForm";
// import { EmailProvider } from "@/app/context/EmailContext";


const Register: NextPage = () => {
  return (
    <div className="w-full">
      <Navbar />
      {/* <EmailProvider> */}
      <Suspense fallback={<div>Loading...</div>}>
     <RegisterForm step={1}/>
      </Suspense>
    </div>
  );
};

export default Register;
