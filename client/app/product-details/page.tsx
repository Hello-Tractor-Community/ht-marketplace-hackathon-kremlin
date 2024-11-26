import React from "react";
import Image from "next/image";
import Header from "../components/Header";

const ProductDetails = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-col md:flex-row justify-between w-[90%] mx-auto mt-[4rem]">
        <div>
          <Image
            src="/images/product_details_img1.png"
            alt="Tractor"
            width={600}
            height={600}
          />
        </div>
        <div className="hidden md:block">
          <Image
            src="/images/product_details_img1.png"
            alt="Tractor"
            width={400}
            height={400}
          />
          <div className="flex">
            <Image
              src="/images/product_details_img1.png"
              alt="Tractor"
              width={200}
              height={200}
            />
            <Image
              src="/images/product_details_img1.png"
              alt="Tractor"
              width={200}
              height={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
