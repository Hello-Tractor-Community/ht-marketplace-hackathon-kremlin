'use client'
import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Tags, Heart } from "lucide-react";

const TractorCard = ({ data }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="w-64 bg-white rounded-lg shadow-md p-4 flex flex-col">
      {/* Year tag */}
      <div className="relative">
        <span className="absolute top-2 left-2 bg-white px-2 py-1 rounded text-sm z-10">
          {data.year}
        </span>

        {/* Main image */}
        <div className="relative">
          <Image
            src={data.images[currentImage]}
            alt={`${data.make} Tractor`}
            className="w-full h-48 object-contain mb-4"
            height={100}
            width={100}
          />

          {/* Dot indicators */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
            {data.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-2 h-2 rounded-full transition-colors
                  ${index === currentImage ? "bg-orange-500" : "bg-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Product details */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium">{data.make}</h3>
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-600">Model:</span>
            <span className="text-sm">{data.model}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <Tags className="w-5 h-5 text-orange-500" />
          <span className="text-orange-500 font-medium">Ksh.</span>
          <span className="text-xl font-bold">{data.price}</span>
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="ml-auto"
          >
            <Heart
              className={`w-5 h-5 ${
                isWishlisted ? "fill-red-500 text-red-500" : "text-red-500"
              }`}
            />
          </button>
        </div>

        {/* Button */}
        <button className="w-full bg-orange-500 text-white py-3 rounded-md mt-2 hover:bg-orange-600 transition-colors">
          MAKE AN OFFER
        </button>
      </div>
    </div>
  );
};

const TractorCardsCarousel = () => {
  const [currentCard, setCurrentCard] = useState(0);

  const tractors = [
    {
      make: "Kubota",
      model: "L4508, 2019",
      year: "2019",
      price: "2.5M",
      images: [
        "/images/hero_tractor.png",
        "/images/green_tractor.png",
        "/images/red_tractor.png",
        "/images/red_tractor.png",
      ],
    },
    {
      make: "John Deere",
      model: "5075E, 2020",
      year: "2020",
      price: "3.2M",
      images: [
        "/images/hero_tractor.png",
        "/images/green_tractor.png",
        "/images/red_tractor.png",
        "/images/red_tractor.png",
      ],
    },
    {
      make: "Massey Ferguson",
      model: "240, 2018",
      year: "2018",
      price: "1.8M",
      images: [
        "/images/hero_tractor.png",
        "/images/green_tractor.png",
        "/images/red_tractor.png",
        "/images/red_tractor.png",
      ],
    },
    {
      make: "New Holland",
      model: "T6050, 2021",
      year: "2021",
      price: "4.5M",
      images: [
        "/images/hero_tractor.png",
        "/images/green_tractor.png",
        "/images/red_tractor.png",
        "/images/red_tractor.png",
      ],
    },
  ];

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % tractors.length);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + tractors.length) % tractors.length);
  };

  return (
    <div className="relative md:max-w-[60%] w-full mx-auto px-4">
      <div className="flex items-center justify-center gap-6">
        {/* Previous button */}
        <button
          onClick={prevCard}
          className="p-2 rounded-full bg-white border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Visible cards */}
        <div className="flex gap-6 overflow-hidden py-4">
          {tractors.map((tractor, index) => {
            const position =
              (index - currentCard + tractors.length) % tractors.length;
            const isVisible = position < 3;

            return (
              isVisible && (
                <div
                  key={index}
                  className="transition-all duration-300"
                  style={{
                    transform: `translateX(${position * 100}%)`,
                  }}
                >
                  <TractorCard data={tractor} />
                </div>
              )
            );
          })}
        </div>

        {/* Next button */}
        <button
          onClick={nextCard}
          className="p-2 rounded-full bg-white border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Dots indicator for cards */}
      <div className="flex justify-center gap-2 mt-4">
        {tractors.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentCard(index)}
            className={`w-2 h-2 rounded-full transition-colors
              ${index === currentCard ? "bg-orange-500" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TractorCardsCarousel;
