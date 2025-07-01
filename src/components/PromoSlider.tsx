// components/PromoSlider.tsx
import React from 'react';
import { products } from '../data/products';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';



export const PromoSlider: React.FC = () => {
  return (
    <div className=" p-2">
      <Swiper
        spaceBetween={4}
        slidesPerView={1}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        modules={[Autoplay]}
        loop={true}
         className="w-ful"
      >
        {products.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="w-full bg-white rounded-xl shadow border overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-2">
                <h3 className="text-sm font-semibold text-gray-800">{item.name}</h3>
                <p className="text-xs text-gray-600">{item.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
