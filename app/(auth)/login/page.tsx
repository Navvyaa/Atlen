import { NextPage } from "next";

import Navbar from "@/app/components/Navbar";
import LoginForm from "@/app/components/LoginForm";


const Login: NextPage = () => {

  return (
    <div className="w-full">
      <Navbar />
      <LoginForm />
    </div>
  );
};

export default Login;
