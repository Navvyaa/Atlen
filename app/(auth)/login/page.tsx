import { NextPage } from "next";

import Navbar from "@/app/components/Navbar";
import LoginForm from "../../components/auth/LoginForm";


const Login: NextPage = () => {

  return (
    <div className="w-full">
      <Navbar />
      
      <LoginForm email={""} />
     
    </div>
  );
};

export default Login;
