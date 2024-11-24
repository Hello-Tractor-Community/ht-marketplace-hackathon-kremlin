"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const TractorDealersSearchSect = () => {
  const [selectedMake, setSelectedMake] = useState("Kubota");
  const [selectedModel, setSelectedModel] = useState("L4508, 2019");
  const [selectedPrice, setSelectedPrice] = useState("500k - 2.5M");

  const makes = [
    "Kubota",
    "Massey Ferguson",
    "John Deere",
    "New Holland",
    "Ford",
    "Deutz Fahr",
  ];
  const models = ["L4508, 2019", "M7060, 2020", "B2320, 2021", "M5-111, 2022"];
  const priceRanges = ["500k - 2.5M", "2.5M - 5M", "5M - 7.5M", "7.5M - 10M"];

  const CustomSelect = ({ label, value, options, onChange }) => (
    <div className="relative">
      <label className="block text-xs font-extrabold">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none w-40 px-3 py-2 bg-gray-100  text-gray-700 
                     focus:outline-none focus:border-orange-500 cursor-pointer"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
      </div>
    </div>
  );

  const handleSearch = () => {
    console.log("Searching with:", {
      selectedMake,
      selectedModel,
      selectedPrice,
    });
  };

  return (
    <div className="w-full max-w-3xl ">
      <div className="flex flex-wrap gap-4 items-end">
        <CustomSelect
          label="Select Make"
          value={selectedMake}
          options={makes}
          onChange={setSelectedMake}
        />

        <CustomSelect
          label="Select Model"
          value={selectedModel}
          options={models}
          onChange={setSelectedModel}
        />

        <CustomSelect
          label="Price Range"
          value={selectedPrice}
          options={priceRanges}
          onChange={setSelectedPrice}
        />

        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default TractorDealersSearchSect;
