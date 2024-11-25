"use client";

import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, FuelIcon } from "lucide-react";
import Image from "next/image";

const TractorMarketplace = () => {
  const [expanded, setExpanded] = useState({
    price: true,
    make: true,
    location: true,
    year: true,
    fuel: true,
  });

  const tractors = [
    {
      id: 1,
      name: "New Holland TT75",
      price: 1800000,
      image: "/images/marketplaceImg1.png",
      engine: "Diesel Engine",
      location: "KISUMU",
    },
    {
      id: 2,
      name: "Massey Ferguson MF 385",
      price: 2400000,
      image: "/images/marketplaceImg2.png",
      engine: "Diesel Engine",
      location: "ELDORET",
    },
    {
      id: 3,
      name: "Kubota L4508",
      price: 1600000,
      image: "/images/marketplaceImg3.png",
      engine: "Diesel Engine",
      location: "NAIROBI",
    },
    {
      id: 4,
      name: "Ford 6610",
      price: 2500000,
      image: "/images/marketplaceImg4.png",
      engine: "Diesel Engine",
      location: "NAROK",
    },
  ];

  const makes = ["John Deere", "Massey Ferguson", "Case IH", "Kubota", "Fendt"];
  const locations = ["Nairobi", "Mombasa", "Kisumu"];
  const fuelTypes = ["Petrol", "Diesel"];

  const toggleSection = (section) => {
    setExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 bg-gray-50 min-h-screen mt-[3rem]">
      {/* Filters Sidebar */}
      <div className="w-full lg:w-64 lg:flex-shrink-0">
        <div className="bg-white rounded-lg shadow p-4">
          {/* Price Filter */}
          <div className="mb-6">
            <div
              className="flex items-center justify-between cursor-pointer mb-3"
              onClick={() => toggleSection("price")}
            >
              <h3 className="font-semibold text-gray-700 text-primaryColor">PRICE</h3>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  expanded.price ? "rotate-180" : ""
                }`}
              />
            </div>
            {expanded.price && (
              <Slider
                defaultValue={[20, 80]}
                max={100}
                step={1}
                className="mt-2"
              />
            )}
          </div>

          {/* Make Filter */}
          <div className="mb-6">
            <div
              className="flex items-center justify-between cursor-pointer mb-3"
              onClick={() => toggleSection("make")}
            >
              <h3 className="font-semibold text-gray-700 text-primaryColor">MAKE</h3>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  expanded.make ? "rotate-180" : ""
                }`}
              />
            </div>
            {expanded.make && (
              <div className="space-y-2">
                {makes.map((make) => (
                  <label key={make} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-600">{make}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Location Filter */}
          <div className="mb-6">
            <div
              className="flex items-center justify-between cursor-pointer mb-3"
              onClick={() => toggleSection("location")}
            >
              <h3 className="font-semibold text-gray-700 text-primaryColor">LOCATION</h3>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  expanded.location ? "rotate-180" : ""
                }`}
              />
            </div>
            {expanded.location && (
              <div className="space-y-2">
                {locations.map((location) => (
                  <label key={location} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-600">{location}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Fuel Filter */}
          <div className="mb-6">
            <div
              className="flex items-center justify-between cursor-pointer mb-3"
              onClick={() => toggleSection("fuel")}
            >
              <h3 className="font-semibold text-gray-700 text-primaryColor">FUEL</h3>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  expanded.fuel ? "rotate-180" : ""
                }`}
              />
            </div>
            {expanded.fuel && (
              <div className="space-y-2">
                {fuelTypes.map((fuel) => (
                  <label key={fuel} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-600">{fuel}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Listing */}
      <div className="flex-1">
        <div className="grid gap-6">
          {tractors.map((tractor) => (
            <Card key={tractor.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row items-center gap-6 p-4">
                  <div className="w-full sm:w-48 h-36 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={tractor.image}
                      alt={tractor.name}
                      className="w-full h-full object-cover"
                      width={300}
                      height={300}
                    />
                  </div>
                  <div className="flex-1 w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold">{tractor.name}</h3>
                      <span className="text-orange-500 font-semibold mt-2 sm:mt-0">
                        KES {tractor.price.toLocaleString()}
                      </span>
                    </div>
                    <span className="inline-block px-3 py-1 bg-gray-100 text-sm rounded mb-3">
                      {tractor.location}
                    </span>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FuelIcon />
                      <span className="text-sm">{tractor.engine}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TractorMarketplace;

