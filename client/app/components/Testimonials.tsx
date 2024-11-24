import React from "react";
import Image from "next/image";

const Testimonials = () => {
  return (
    <div className="bg-secondaryColor my-[3rem]">
      <div className="flex flex-col md:flex-row p-4 gap-[2rem] w-[90%] mx-auto items-center">
        <div className="space-y-4 max-w-xl">
          <h1 className="text-primaryColor text-xl font-extrabold">
            Testimonials
          </h1>
          <p>
            &quot;I found the perfect tractor for my farm through this platform.
            The search filters made it easy, and I was able to negotiate a great
            deal directly with the seller. Highly recommended!&quot;
          </p>
          <p className="text-sm font-extrabold">— James K., Farmer, Nakuru</p>
        </div>
        <div>
          <Image
            src="/images/farmer.png"
            alt="Farmer"
            width={700}
            height={700}
          />
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
