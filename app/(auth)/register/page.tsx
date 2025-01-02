import { NextPage } from "next";

import Navbar from "@/app/components/Navbar";
import RegisterForm from "@/app/components/RegisterForm";



const Register: NextPage = () => {
  return (
    <div className="w-full">
      <Navbar />
      <RegisterForm />
    </div>
  );
};

export default Register;
