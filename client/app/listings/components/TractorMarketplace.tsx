"use client";

import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, FuelIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Tractor {
  id: number;
  name: string;
  brand: string;
  model: string;
  price: string;
  condition: string;
  location: string;
  description: string;
  images: string[];
}

interface TractorMarketplaceProps {
  tractors: Tractor[];
}

const TractorMarketplace = ({ tractors }: TractorMarketplaceProps) => {
  const [expanded, setExpanded] = useState({
    price: true,
    make: true,
    location: true,
    year: true,
    fuel: true,
  });

  const makes = ["John Deere", "Massey Ferguson", "Case IH", "Kubota", "Fendt"];
  const locations = ["Nairobi", "Mombasa", "Kisumu"];
  const fuelTypes = ["Petrol", "Diesel"];

  const toggleSection = (section: string) => {
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
              <h3 className="font-semibold text-gray-700 text-primaryColor">
                PRICE
              </h3>
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
              <h3 className="font-semibold text-gray-700 text-primaryColor">
                MAKE
              </h3>
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
              <h3 className="font-semibold text-gray-700 text-primaryColor">
                LOCATION
              </h3>
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
              <h3 className="font-semibold text-gray-700 text-primaryColor">
                FUEL
              </h3>
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
              <Link href="/product-details">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row items-center gap-6 p-4">
                    <div className="w-full sm:w-48 h-36 bg-gray-100 rounded-lg overflow-hidden">
                      {tractor.images.map((image) => (
                        <Image
                          key={image.id}
                          alt="Image"
                          src={image.image_1}
                          width={300}
                          height={300}
                        />
                      ))}
                    </div>
                    <div className="flex-1 w-full">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                        <span className="inline-block px-3 py-1  text-sm  mb-3">
                          {tractor.brand}
                        </span>
                        <h3 className="text-xl font-semibold">
                          {tractor?.model}
                        </h3>
                        <span className="text-orange-500 font-semibold mt-2 sm:mt-0">
                          KES {tractor.price.toLocaleString()}
                        </span>
                      </div>
                      <span className="inline-block px-3 my-2 py-1 bg-gray-100 text-sm rounded mb-3">
                        {tractor.location}
                      </span>
                      <span className="text-[0.5rem] text-gray-600 inline-block my-4">
                        {tractor.description}
                      </span>
                      <div className="flex items-center gap-2 text-gray-600">
                        <FuelIcon />
                        <span className="text-sm">{tractor.condition}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TractorMarketplace;
