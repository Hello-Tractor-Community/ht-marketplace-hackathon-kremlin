import React from "react";
import Image from "next/image";

const HeroContent = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-[3rem] md:gap-auto items-center mt-[3rem] md:mt-[4rem] md:mb-[6rem] w-full md:w-[90%] mx-auto">
      <div className="space-y-6 ml-[5%] text-center md:text-left md:ml-[4rem] ">
        <p className="text-primaryColor text-sm font-extrabold">Welcome to</p>
        <div className="space-y-2">
          <h1 className="text-5xl font-black !font-montserrat tracking-tight">
            Hello Tractor
          </h1>
          <p className="text-[0.6rem] font-extrabold text-primaryColor tracking-wide">
            BUY TRACTOR / SELL TRACTOR / DEALER LISTINGS
          </p>
        </div>
        <p className="text-xl">
          Find Realiable Tractors and Agri-implements Near You!
        </p>
      </div>
      <div>
        <Image
          src="/images/hero_tractor.png"
          alt="Tractor image"
          width={500}
          height={500}
          className="hidden md:block"
        />
        <Image
          src="/images/hero_tractor.png"
          alt="Tractor image"
          width={300}
          height={300}
          className="block md:hidden"
        />
      </div>
    </div>
  );
};

export default HeroContent;
