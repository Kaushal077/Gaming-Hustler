import React from "react";
import image1 from "../../../assets/gallary/image1.png";
import image2 from "../../../assets/gallary/image2.png";
import image3 from "../../../assets/gallary/image3.png";
import image4 from "../../../assets/gallary/image4.png";
import image5 from "../../../assets/gallary/image5.png";
import image6 from "../../../assets/gallary/image6.png";

const Gallery = () => {
  return (
    <div className="md:w-[90%] mx-auto my-12">
      <div className="">
        <h1 className="text-5xl font-bold text-center text-black dark:text-white">
          Our <span className="text-secondary">Gallery</span>
        </h1>
        <i>
            <img src="https://www.gamerji.com/img/title-shape.png" alt="Title Shape" className="mx-auto my-4" />
        </i>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="col-span-1 md:col-span-2 row-span-6 md:row-span-5 rounded-3xl border-white border-4">
          <img
            src={image1}
            alt=""
            className="h-full w-full object-cover rounded-3xl"
          />
        </div>
        <div className="col-span-1 md:col-span-2 row-span-3 rounded-3xl border-white border-4">
          <img
            src={image2}
            alt=""
            className="h-full w-full object-cover rounded-3xl"
          />
        </div>
        <div className="row-span-2 rounded-3xl border-white border-4">
          <img
            src={image3}
            alt=""
            className="h-full w-full object-cover rounded-3xl"
          />
        </div>
        <div className="row-span-3 rounded-3xl border-white border-4">
          <img
            src={image4}
            alt=""
            className="h-full w-full object-cover rounded-3xl"
          />
        </div>
        <div className="row-span-2  rounded-3xl border-white border-4">
          <img
            src={image5}
            alt=""
            className="h-full w-full object-cover rounded-3xl"
          />
        </div>
        <div className="row-span-2  rounded-3xl border-white border-4">
          <img
            src={image6}
            alt=""
            className="h-full w-full object-cover rounded-3xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;