import React from "react";
import Image from "next/image";

const Gallery = () => {
  return (
    <div className="my-[3rem]">
      <h1 className="font-extrabold text-center text-2xl tracking-wide w-full">
        Our Gallery
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 w-[90%] mx-auto gap-4 my-[3rem]">
        <Image
          src="/images/galleryImg1.png"
          alt="Tractor"
          height={300}
          width={300}
        />
        <Image
          src="/images/galleryImg2.png"
          alt="Tractor"
          height={300}
          width={300}
        />
        <Image
          src="/images/galleryImg3.png"
          alt="Tractor"
          height={300}
          width={300}
        />
        <Image
          src="/images/galleryImg4.png"
          alt="Tractor"
          height={300}
          width={300}
        />
        <Image
          src="/images/galleryImg5.png"
          alt="Tractor"
          height={300}
          width={300}
        />
        <Image
          src="/images/galleryImg6.png"
          alt="Tractor"
          height={300}
          width={300}
        />
      </div>
    </div>
  );
};

export default Gallery;
