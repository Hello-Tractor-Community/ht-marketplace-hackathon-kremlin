"use client";
import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, FuelIcon } from "lucide-react";
import Link from "next/link";

const ProductDetailsSect = () => {
  const similarProducts = [
    {
      id: 1,
      name: "Ford 6610",
      price: "2,400,000",
      image: "/images/marketplaceImg1.png",
      engine: "Diesel, Turbine engine",
    },
    {
      id: 2,
      name: "Mahindra Yuvo 575 DI",
      price: "2,100,000",
      image: "/images/marketplaceImg2.png",
      engine: "Diesel, Turbine engine",
    },
    {
      id: 3,
      name: "Deutz Fahr 70 HP Agrolux",
      price: "2,900,000",
      image: "/images/marketplaceImg3.png",
      engine: "Diesel, Turbine engine",
    },
  ];

  const handleBookNow = () => {
    window.location.href = "/chat";
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Takes up 2 columns */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-gray-600 flex items-center gap-2">
              <FuelIcon />
              Diesel
            </span>
          </div>

          <h1 className="text-2xl font-bold mb-6">Massey Ferguson MF 385</h1>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Details</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a
              consequat tortor. Proin viverra ipsum sit amet ipsum sagittis
              tempus.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Features</h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <h3 className="font-medium mb-3 text-gray-700">Engine</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 375 diesel turbine engine</li>
                  <li>• Engine displacement 4.1 liters</li>
                  <li>• Cylinder: 4 inline direct inject affected</li>
                  <li>
                    • Cooling System: Water cooled to maintain optimal
                    temperature
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-3 text-gray-700">Performance</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• High durability heavy-duty trans</li>
                  <li>• Enhanced support system for steering & turning</li>
                  <li>• Eco-friendly</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-3 text-gray-700">
                  Brakes and Steering
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Highly durable disc brakes for effective stopping</li>
                  <li>• Heavy-duty power assist steering</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-3 text-gray-700">Options</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    • Front End to be fit for lifting multiple heavy-duty
                    equipment
                  </li>
                  <li>
                    • PTO shaft and gearbox control for precise implement speed
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <button className="text-orange-500 hover:text-orange-600 text-sm font-medium">
            See Reviews
          </button>
        </div>

        {/* Right Column */}
        <div>
          <Card className="mb-6 shadow-sm">
            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="text-sm text-gray-500 mb-1">Price</h3>
                <span className="text-2xl font-bold">KES. 2,800,000</span>
              </div>
              <Button
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                onClick={handleBookNow}
              >
                Book Now
              </Button>

              <div className="flex items-center mt-4 gap-1">
                {Array(5)
                  .fill(1)
                  .map((_, index) => (
                    <Image
                      src="/star.png"
                      key={index}
                      alt="star"
                      width={24}
                      height={24}
                    />
                  ))}
              </div>
            </CardContent>
          </Card>

          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/farmer.png"
                alt="Alex Macharia"
                className="rounded-full"
                width={300}
                height={300}
              />
              <span className="font-medium">Alex Macharia</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
              <MapPin className="w-4 h-4" />
              <span>Location</span>
            </div>
            <div className="bg-gray-100 h-32 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Similar Products */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-6">Similar Second-hand Tractors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {similarProducts.map((product) => (
            <Card key={product.id} className="shadow-sm">
              <Link href="/product-details">
                <CardContent className="p-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                    width={300}
                    height={300}
                  />
                  <h3 className="font-medium mb-2">{product.name}</h3>
                  <p className="text-orange-500 font-bold mb-2">
                    KES. {product.price}
                  </p>
                  <p className="text-sm text-gray-600">{product.engine}</p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSect;
