import { useQuery } from 'common/hooks/useQuery';
import React, { useMemo } from 'react';
import RecommendCard from './recommend-card';
import { Spin } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode } from 'swiper/modules';

const ListingRecommend = () => {
    const { data, isLoading } = useQuery('events');

    const events = useMemo(() => {
        return data?.filter((item) => item?.bigEvent === true);
    }, [data]);

    if (events?.length === 0) {
        return null;
    }

    return (
        <Spin spinning={isLoading}>
            <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-semibold">Recommend events</h2>
                <div>
                    <Swiper
                        slidesPerView="auto"
                        centeredSlidesBounds
                        spaceBetween={30}
                        className="mySwiper"
                        modules={[Pagination, FreeMode]}
                        freeMode
                    >
                        {events?.map((item) => (
                            <SwiperSlide className="!w-[384px]" key={item?.id}>
                                <RecommendCard data={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </Spin>
    );
};

export default ListingRecommend;
