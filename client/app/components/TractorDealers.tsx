import React from "react";
import TractorCardsCarousel from "./TractorCardsCarousel";
import TractorDealersSearchSect from "./TractorDealersSearchSect";

const TractorDealers = () => {
  return (
    <div className="mt-[3rem] w-[90%] mx-auto flex  flex-col md:flex-row items-center">
      <div className="space-y-5">
        <p className="text-primaryColor text-sm font-extrabold">
          Introducing Hello Tractors Dealers
        </p>
        <h1 className="font-extrabold text-2xl tracking-wide w-full">
          Best Prices, <br /> Professional Advice!
        </h1>
        <p className="text-xs text-grey-500">
          Our trusted dealers will give you the best of both worlds. <br /> Quality
          Tractors and the best prices in Kenya. We will also give <br /> you free
          consultation and advice on the best options to go <br /> with.
        </p>
        <TractorDealersSearchSect/>
      </div>
      <TractorCardsCarousel/>
    </div>
  );
};

export default TractorDealers;
