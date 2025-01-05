import { NextPage } from "next";

import Navbar from "@/app/components/Navbar";
import RegisterForm from "@/app/components/auth/RegisterForm";
// import { EmailProvider } from "@/app/context/EmailContext";


const Register: NextPage = () => {
  return (
    <div className="w-full">
      <Navbar />
      {/* <EmailProvider> */}
      <RegisterForm step={1}/>
      {/* </EmailProvider> */}
    </div>
  );
};

export default Register;
