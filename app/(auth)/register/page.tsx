import { NextPage } from "next";
import React, { Suspense } from 'react';

import Navbar from "@/app/components/Navbar";
import RegisterForm from "@/app/components/auth/RegisterForm";
import Loading from "@/app/components/ui/Loading";



const Register: NextPage = () => {
  return (
    <div className="w-full">
      <Navbar />
      <Suspense fallback={<Loading open={true} title="Loading" subtitle="" />}>
     <RegisterForm step={1}/>
      </Suspense>
    </div>
  );
};

export default Register;
