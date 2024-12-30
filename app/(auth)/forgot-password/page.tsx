import { NextPage } from "next";
import Navbar from "@/app/components/Navbar";
import ForgotPasswordForm from "@/app/components/ForgotPasswordForm";

import { ModalProvider } from "@/app/context/ModalContext";

const ForgotPassword: NextPage = () => {
  return (
    <div className="w-full">
      <Navbar />
        <ModalProvider>
      <ForgotPasswordForm />
    </ModalProvider>
    </div>
  );
};

export default ForgotPassword;
