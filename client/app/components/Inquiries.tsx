import React from "react";
import MessagingFormCard from "./MessagingFormCard";

const Inquiries = () => {
  return (
    <div className="mt-[3rem] w-[90%] mx-auto flex justify-between gap-6  flex-col md:flex-row items-center">
      <div className="space-y-5">
        <p className="text-primaryColor text-sm font-extrabold">
          Inquiries and Negotiations
        </p>
        <h1 className="font-extrabold text-2xl tracking-wide w-full">
          Connect, Inquire, <br /> Negotiate
        </h1>
        <p className="text-xs text-grey-500">
          Fill in this form and let us know what you’d like us to talk about
        </p>
        <div className="mt-[2rem] space-y-1">
          <h1 className="text-4xl text-primaryColor font-extrabold">143+</h1>
          <p className="text-[0.7rem] text-grey-secondaryColor">Submitted inquiries</p>
        </div>
      </div>
      <MessagingFormCard/>
    </div>
  );
};

export default Inquiries;
