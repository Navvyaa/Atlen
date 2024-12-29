import { NextPage } from "next";
import dynamic from "next/dynamic";
import Navbar from "@/app/components/Navbar";
import LoginPage from "@/app/components/LoginForm";

// Dynamically import the client-side component
// const LoginPage = dynamic(() => import("@/app/components/LoginForm"), { ssr: false });

const Login: NextPage = () => {
  return (
    <div className="w-full">
      <Navbar />
      <LoginPage />
    </div>
  );
};

export default Login;
