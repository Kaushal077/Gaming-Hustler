import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

const Carousel = () => {
  const brands = [
    { id: 1, name: 'Brand 1', imageUrl: 'https://cdn.akamai.steamstatic.com/store/home/store_home_share.jpg' },
    { id: 2, name: 'Brand 2', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQak07_DrQJjgw6zpCdQmlz3_GFpd-H5TAqwQ&s' },
    { id: 3, name: 'Brand 3', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgG4n30E6kqkmGuY1o1Qph7-z7Cogbg6pkFA&s' },
    { id: 4, name: 'Brand 4', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf0OuSI_oYB7V6qWgqb_gQ8D5tfK6ltcGJXw&s' },
    { id: 5, name: 'Brand 5', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBY3OrD2e3MtwLZRP4nzOF0p4o6-LzlDwrlA&s' },
    { id: 6, name: 'Brand 6', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQak07_DrQJjgw6zpCdQmlz3_GFpd-H5TAqwQ&s' },
    { id: 7, name: 'Brand 7', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWvoWQsortXctN6GGGPllWXWUJCEWS082jQQ&s' },
  ];

  return (
    <div className="mx-auto max-w-screen-lg">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={3}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {brands.map((brand) => (
          <SwiperSlide key={brand.id}>
            <div className="w-full h-56 md:h-64 lg:h-72 xl:h-40 pb-5">
              <img
                src={brand.imageUrl}
                alt={brand.name}
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
