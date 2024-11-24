'use client';

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const TractorListingsTabs = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [currentSlide, setCurrentSlide] = useState(0);

  const tabs = [
    { id: "all", label: "All" },
    { id: "massey", label: "Massey Ferguson" },
    { id: "kubota", label: "Kubota" },
    { id: "ford", label: "Ford 6610" },
    { id: "deutz", label: "Deutz Fahr" },
    { id: "others", label: "Others" },
  ];

  const tractorContent = {
    all: [
      {
        id: 1,
        image: "/images/hero_tractor.png",
        text: "Suitable for large farms and tough terrain",
      },
      {
        id: 2,
        image: "/images/red_tractor.png",
        text: "Built for large farms and long-term use",
      },
      {
        id: 3,
        image: "/images/green_tractor.png",
        text: "Best-selling tractors",
      },
    ],
    massey: [
      {
        id: 1,
        image: "/images/hero_tractor.png",
        text: "Massey Ferguson 8S Series",
      },
      {
        id: 2,
        image: "/images/red_tractor.png",
        text: "Massey Ferguson 5S Series",
      },
      {
        id: 3,
        image: "/images/green_tractor.png",
        text: "Massey Ferguson Global Series",
      },
    ],
    kubota: [
      { id: 1, image: "/images/hero_tractor.png", text: "Kubota M7 Series" },
      { id: 2, image: "/images/red_tractor.png", text: "Kubota L Series" },
      { id: 3, image: "/images/green_tractor.png", text: "Kubota B Series" },
    ],
    ford: [
      {
        id: 1,
        image: "/images/hero_tractor.png",
        text: "Ford 6610 Classic Model",
      },
      {
        id: 2,
        image: "/images/red_tractor.png",
        text: "Ford 6610 with implements",
      },
      { id: 3, image: "/images/green_tractor.png", text: "Ford 6610 in action" },
    ],
    deutz: [
      { id: 1, image: "/images/hero_tractor.png", text: "Deutz-Fahr 9 Series" },
      { id: 2, image: "/images/red_tractor.png", text: "Deutz-Fahr 6 Series" },
      {
        id: 3,
        image: "/images/green_tractor.png",
        text: "Deutz-Fahr 4E Series",
      },
    ],
    others: [
      { id: 1, image: "/images/hero_tractor.png", text: "John Deere Models" },
      {
        id: 2,
        image: "/images/red_tractor.png",
        text: "New Holland Tractors",
      },
      { id: 3, image: "/green_tractor.png", text: "Case IH Range" },
    ],
  };

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === tractorContent[activeTab].length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? tractorContent[activeTab].length - 1 : prev - 1
    );
  };

  return (
    <div className="w-full max-w-4xl p-4">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setCurrentSlide(0);
            }}
            className={`px-[0.8rem] py-[0.2rem] rounded-full text-sm font-medium transition-all
              ${
                activeTab === tab.id
                  ? "bg-[#ff792b] text-white"
                  : "border border-[#ff792b] text-[#ff792b] hover:bg-[#ff792b] hover:text-white"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Carousel */}
      <div className="relative">
        <div className="overflow-hidden rounded-lg border border-[#ff792b]">
          <div className="relative h-96">
            {tractorContent[activeTab].map((item, index) => (
              <div
                key={item.id}
                className={`absolute w-full h-full transition-opacity duration-500 
                  ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
                style={{ display: index === currentSlide ? "block" : "none" }}
              >
                <Image
                  src={item.image}
                  alt={item.text}
                  className="w-full h-64 object-cover"
                  width={200}
                  height={200}
                />
                <div className="p-4">
                  <p className="text-lg text-gray-800">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white border border-[#ff792b] text-[#ff792b] hover:bg-[#ff792b] hover:text-white transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white border border-[#ff792b] text-[#ff792b] hover:bg-[#ff792b] hover:text-white transition-colors"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {tractorContent[activeTab].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors
                ${index === currentSlide ? "bg-[#ff792b]" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TractorListingsTabs;
