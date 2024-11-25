import React from "react";
import Image from "next/image";
import SignInForm from "./components/SignInForm";

const SignIn = () => {
  return (
    <div className="flex items-center justify-between  mx-auto">
      <Image
        src="/illustrations/signin_illustration.png"
        alt="Lady"
        width={400}
        height={400}
        className="hidden md:block"
      />
      <SignInForm/>
    </div>
  );
};

export default SignIn;