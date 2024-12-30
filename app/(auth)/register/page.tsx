import { NextPage } from "next";

import Navbar from "@/app/components/Navbar";
import LoginPage from "@/app/components/LoginForm";


const Register: NextPage = () => {
  return (
    <div className="w-full">
      <Navbar />
      <LoginPage mode="register" />
    </div>
  );
};

export default Register;
