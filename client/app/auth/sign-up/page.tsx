import React from "react";
import Image from "next/image";
import SignUpForm from "./components/SignUpForm";

const SignUp = () => {
  return (
    <div className="flex items-center justify-between  mx-auto">
      <Image
        src="/illustrations/signup_illustration.png"
        alt="Lady"
        width={400}
        height={400}
        className="hidden md:block"
      />
      <SignUpForm/>
    </div>
  );
};

export default SignUp;
