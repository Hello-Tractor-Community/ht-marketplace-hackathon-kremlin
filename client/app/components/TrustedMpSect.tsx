import React from "react";
import Image from "next/image";
import { ChevronsRight } from "lucide-react";

const TrustedMpSect = () => {
  return (
    <div className="bg-secondaryColor mt-[3rem] h-[20rem] relative flex justify-center">
      <div
        className="bg-white rounded w-[80%] mx-auto py-[2rem] relative z-10 shadow-lg  "
        style={{ marginTop: "-3rem", marginBottom: "-3rem" }}
        
      >
        <h1 className="font-extrabold text-center text-2xl tracking-wide w-full">
          Your Trusted Marketplace for Tractors and More
        </h1>
        <div className="my-[3rem] mx-auto w-[70%]">
          <p className="text-primaryColor text-xs my-[3rem] font-extrabold flex items-center">
            WHAT WE OFFER
            <ChevronsRight />
          </p>
          <div className="flex justify-between">
            <div className="flex flex-col items-center space-y-2">
              <Image
                src="/verified_tractors.png"
                alt="verified icon"
                width={80}
                height={80}
                className="hidden md:block"
              />
              <Image
                src="/verified_tractors.png"
                alt="verified icon"
                width={40}
                height={40}
                className="block md:hidden"
              />
              <p className="md:text-xs text-[0.5rem] font-thin md:font-extrabold">
                Verified Tractors & Sellers
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Image
                src="/messaging_system.png"
                alt="Messaging icon"
                width={80}
                height={80}
                className="hidden md:block"
              />
              <Image
                src="/messaging_system.png"
                alt="verified icon"
                width={40}
                height={40}
                className="block md:hidden"
              />
              <p className="md:text-xs text-[0.5rem] font-thin md:font-extrabold">Messaging System</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Image
                src="/trusted_marketplace.png"
                alt="Marketplace icon"
                width={80}
                height={80}
                 className="hidden md:block"
              />
              <Image
                src="/trusted_marketplace.png"
                alt="verified icon"
                width={40}
                height={40}
                className="block md:hidden"
              />
              <p className="md:text-xs text-[0.5rem] font-thin md:font-extrabold">
                Tractor Parts Marketplace
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Image
                src="/certified_operators.png"
                alt="Operators icon"
                width={80}
                height={80}
                className="hidden md:block"
              />
               <Image
                src="/certified_operators.png"
                alt="verified icon"
                width={40}
                height={40}
                className="block md:hidden"
              />
              <p className="md:text-xs text-[0.5rem] font-thin md:font-extrabold">
                Certified Tractor Operators
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedMpSect;
