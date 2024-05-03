import { useQuery } from 'common/hooks/useQuery';
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { Spin } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useAuth } from 'common/hooks/useAuth';
import useLoginModal from '~/hooks/useLoginModal';

const Slider = () => {
    const router = useRouter();
    const auth = useAuth('client');

    const { onOpen } = useLoginModal();

    const { data, isLoading } = useQuery('promotions');

    const swiperRef = useRef(null);

    const [currentSlide, setCurrentSlide] = useState();

    if (data?.length === 0) {
        return null;
    }

    return (
        <Spin spinning={isLoading}>
            <div className="relative">
                <Swiper
                    navigation={true}
                    loop
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    modules={[Autoplay, Navigation]}
                    speed={2000}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    onSlideChange={(e) =>
                        setCurrentSlide(
                            Number.isNaN(e.realIndex) ? 1 : e.realIndex + 1
                        )
                    }
                    className="mySwiper h-[calc(100vh_-_150px)] w-full"
                >
                    {data?.map((item) => (
                        <SwiperSlide
                            className="cursor-pointer"
                            key={item?.id}
                            onClick={() => {
                                if (!auth) {
                                    onOpen();
                                } else {
                                    router.push(`/events/${item?.eventId}`);
                                }
                            }}
                        >
                            <div className="relative">
                                <div className="l absolute left-0 h-[400px] w-full bg-rose-600 xl:h-[540px]" />
                                <div className="absolute left-36 top-36 z-10 w-[500px] text-center text-5xl font-bold uppercase text-white">
                                    {item?.title}
                                </div>
                                <Image
                                    className="absolute right-0 w-[80%] object-cover"
                                    src={item?.thumbnail?.[0]}
                                    width={800}
                                    height={800}
                                    alt=""
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="absolute bottom-6 left-10 z-30 flex items-center gap-2">
                    <button
                        className="h-8 w-8 border bg-rose-500 text-white hover:bg-rose-400"
                        onClick={() => {
                            swiperRef.current?.slidePrev();
                        }}
                    >
                        <LeftOutlined />
                    </button>
                    <button
                        className="h-8 w-8 border bg-rose-500 text-white hover:bg-rose-400"
                        onClick={() => {
                            swiperRef.current?.slideNext();
                        }}
                    >
                        <RightOutlined />
                    </button>
                    <div className="ml-10 flex w-[40px] items-center text-lg font-medium text-rose-500">
                        <p className="w-[15px] text-center">{currentSlide}</p>
                        <p className="w-[15px] text-center">&nbsp;/&nbsp;</p>
                        <p className="w-[15px] text-center">{data?.length}</p>
                    </div>
                </div>
            </div>
        </Spin>
    );
};

export default Slider;
