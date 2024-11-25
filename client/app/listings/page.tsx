import React from "react";
import Image from "next/image";
import Header from "../components/Header";
import TractorMarketplace from "./components/TractorMarketplace";
import Footer from "../components/Footer";
import SearchBox from "@/components/search-box";

const ListingsPage = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-col md:flex-row justify-between gap-[3rem] md:gap-auto items-center mt-[3rem] md:mt-[4rem] md:mb-[6rem] w-full md:w-[90%] mx-auto">
        <div className="space-y-14 ml-[5%] text-center md:text-left md:ml-[4rem] max-w-md ">
          <h1 className="text-4xl font-black !font-montserrat tracking-tight">
            Buy A Tractor
          </h1>
          <p>
            Easily sort by price, brand, location, and features to find the
            tractor that suits your needs.
          </p>
          <p className="text-sm">
            Whether you&apos;re a small-scale farmer or managing a large agricultural
            operation, our platform offers a diverse selection of tractors to
            meet your needs. From compact tractors ideal for gardens and small
            farms to heavy-duty models designed for large-scale farming, you&apos;ll
            find the perfect machine to get the job done efficiently. Each
            listing includes detailed specifications, so you know exactly what
            you’re getting.
          </p>
        </div>
        <div>
          <Image
            src="/images/listings_hero_img.png"
            alt="Tractor image"
            width={500}
            height={500}
            className="hidden md:block"
          />
          <Image
            src="/images/listings_hero_img.png"
            alt="Tractor image"
            width={300}
            height={300}
            className="block md:hidden"
          />
        </div>
      </div>
      <div className="w-[90%] mx-auto">
      <h1 className="text-2xl font-bold mb-5">Tractor On Sale</h1>
      <SearchBox/>
      <div className="bg-secondaryColor">
       
      </div>
      <TractorMarketplace/>
      </div>
      <Footer/>
    </div>
  );
};

export default ListingsPage;
