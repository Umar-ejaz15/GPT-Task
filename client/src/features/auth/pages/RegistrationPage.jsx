import React from "react";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";

const RegistrationPage = () => {
  return (
    <div className="bg-zinc-900 text-white h-screen flex justify-center items-center">
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;
