/* eslint react/no-unescaped-entities: "off" */
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

export default function UIShow() {
  return (
    <div className="flex overflow-x-auto w-full h-full min-h-screen justify-center items-center container mx-auto">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectCoverflow]}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        slidesPerView={"auto"}
        grabCursor={true}
        effect={"coverflow"}
        centeredSlides={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        loop={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: true,
        }}
        className="mySwiper flex  w-full h-full  justify-center items-center container mx-auto "
      >
        <SwiperSlide>
          <div className="rounded-md flex w-full p-12 md:p-0 h-100 justify-center items-center">
            <img
              src="https://images.unsplash.com/photo-1706148881913-350e148ca6a6?q=full&p-12 md:p-0w=1372&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="relative rounded-lg object-cover flex w-full h-full"
            />
            <h2 className="absolute text-5xl font-bold"> Slider 1 </h2>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="rounded-md flex w-full p-12 md:p-0 h-100 justify-center items-center">
            <img
              src="https://plus.unsplash.com/premium_photo-1682377521362-c4e8be6e62b4?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="relative rounded-lg object-cover flex w-full h-full"
            />
            <h2 className="absolute text-5xl font-bold"> Slider 2 </h2>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="rounded-md flex w-full p-12 md:p-0 h-100 justify-center items-center">
            <img
              src="https://images.unsplash.com/photo-1569873175476-10aa45523ab8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJvbnNhaXxlbnwwfHwwfHx8MA%3D%3D"
              alt=""
              className="relative rounded-lg object-cover flex w-full h-full"
            />
            <h2 className="absolute text-5xl font-bold"> Slider 3 </h2>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="rounded-md flex w-full p-12 md:p-0 h-100 justify-center items-center">
            <img
              src="https://images.unsplash.com/photo-1632161286719-5afe9b5d954b?q=80&w=1490&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="relative rounded-lg object-cover flex w-full h-full"
            />
            <h2 className="absolute text-5xl font-bold "> Slider 4 </h2>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="rounded-md flex w-full p-12 md:p-0 h-100 justify-center items-center">
            <img
              src="https://images.unsplash.com/photo-1430024759857-660f9aa67c47?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="relative rounded-lg object-cover flex w-full h-full"
            />
            <h2 className="absolute text-5xl font-bold"> Slider 5 </h2>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="rounded-md flex w-full p-12 md:p-0 h-100 justify-center items-center">
            <img
              src="https://plus.unsplash.com/premium_photo-1668073438756-76fe6a233c56?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="relative rounded-lg object-cover flex w-full items-center jusc min-h-full"
            />
            <h2 className="absolute text-5xl font-bold "> Slider 6 </h2>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="rounded-md flex w-full p-12 md:p-0 h-100 justify-center items-center">
            <img
              src="https://plus.unsplash.com/premium_photo-1682542226584-e776098d5ea9?q=80&w=1404&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="relative rounded-lg object-cover flex w-full h-full"
            />
            <h2 className="absolute text-5xl font-bold"> Slider 7 </h2>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" rounded-md flex w-full p-12 md:p-0 h-100 justify-center items-center ">
            <img
              src="https://media.istockphoto.com/id/1175022967/photo/bougainvillea-bonsai-plant-pune.jpg?s=1024x1024&w=is&k=20&c=6Jft-IcCZ7wdiJpaAcX7i1ATHnS5l12msVFVxiHBBdA="
              alt=""
              className="relative rounded-lg object-cover flex w-full min-h-full"
            />
            <h2 className="absolute text-5xl font-bold"> Slider 8 </h2>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
