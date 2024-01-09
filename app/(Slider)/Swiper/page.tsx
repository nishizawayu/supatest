'use client'

import React, {useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper as SwiperClass } from 'swiper';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css/effect-coverflow';
import Image from 'next/image';

const Slider = ()=> {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    const [flip, setFlip] = useState<Array<boolean | null>>(Array(10).fill(null));

    const handleClick = (index:number) => {
        const newFlip = [...flip];
        newFlip[index] = newFlip[index] === null ? true : !newFlip[index];
        setFlip(newFlip);
    };
    return (
        <>
        <div className='relative w-[80%] h-[100%]'>
            <h1 className='text-[64px] text-center font-bold '>Bチーム</h1>
            <Swiper
                slidesPerView={2}
                spaceBetween={10}
                // navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs, EffectCoverflow]}
                className="mySwiper2 h-[80%]"
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                grabCursor={true}
                centeredSlides={true}
                effect={'coverflow'}
            >
                <SwiperSlide>
                    <div className="card">
                        <input type="checkbox" id="card1" className="more" aria-hidden="true" />
                        <div className="content">
                        <div className="front" style={{ backgroundImage: `url("https://swiperjs.com/demos/images/nature-1.jpg")` }}>
                            <div className="inner">
                            <label htmlFor="card1" className="button" aria-hidden="true">
                                Details
                            </label>
                            </div>
                        </div>
                        <div className="back">
                            <div className="inner">
                            <p>あああ</p>
                            <label htmlFor="card1" className="button return" aria-hidden="true">
                                <i className="fas fa-arrow-left"></i>
                            </label>
                            </div>
                        </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
                </SwiperSlide>
            </Swiper>
            {/* <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={30}
                slidesPerView={5}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                <p>5/5</p>
                </SwiperSlide>
                <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                <p>5/15</p>
                </SwiperSlide>
                <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                <p>5/25</p>
                </SwiperSlide>
                <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                <p>5/35</p>
                </SwiperSlide>
                <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
                <p>5/50</p>
                </SwiperSlide>
                <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
                </SwiperSlide>
            </Swiper> */}
            <div className='flex justify-around h-[20%]'>
                <div className=''>
                    <p>次の進化まで</p>
                    <p className=''><span className='text-[40px]'>1</span>回</p>
                </div>
                <div className='border-r'></div>
                <div>
                    <p>特徴</p>
                    <p className='text-[32px]'>面白い</p>
                </div>
                <div className='border-r'></div>
                <div>
                    <p>強み</p>
                    <p className='text-[32px]'>企画力</p>
                </div>
                <div className='border-r'></div>
                <div>
                    <p>合計プレゼン数</p>
                    <p className=''><span className='text-[40px]'>1</span>回</p>
                </div>
            </div>
        </div>
      </>
    )
}

export default Slider