import { Spin } from 'antd';
import { useQuery } from 'common/hooks/useQuery';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import Container from '~/components/container';
import { getWard, getDistrict, getProvince } from 'common/lib/getAddress';
import dayjs from 'dayjs';
import { CalendarFilled } from '@ant-design/icons';
import ListTicket from '~/components/tickets/list-ticket';
import ListComment from '~/components/events/list-comment';

const EventDetail = () => {
    const { query } = useRouter();

    const { data, isLoading } = useQuery(`events?id=${query?.id}`, {
        id: query?.id,
    });

    const { data: type } = useQuery(`eventType?id=${data?.[0]?.eventTypeId}`, {
        id: data?.[0]?.eventTypeId,
    });

    const event = useMemo(() => {
        if (data?.length > 0) {
            return data?.[0];
        }
        return null;
    }, [data]);

    const address = useMemo(() => {
        return {
            street: event?.street || null,
            ward: event?.wardId ? getWard(event?.wardId)?.name : null,
            district: event?.districtId
                ? getDistrict(event?.districtId)?.name
                : null,
            province: event?.provinceId
                ? getProvince(event?.provinceId)?.name
                : null,
        };
    }, [event]);

    return (
        <Spin spinning={isLoading}>
            <main className="py-24">
                <Container>
                    <div className="flex gap-8 pb-16">
                        <div className="min-w-[20%]">
                            <Image
                                className="rounded-xl object-cover"
                                src={event?.image?.[0]}
                                alt={event?.name}
                                style={{ width: 384, height: 230 }}
                                width={384}
                                height={230}
                            />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold uppercase">
                                {event?.name}
                            </h3>
                            <p className="text-slate-400">#{type?.[0]?.name}</p>
                            <div className="flex gap-2 font-medium text-neutral-500">
                                <CalendarFilled />
                                <p>
                                    {dayjs(event?.eventTime?.[0]).format(
                                        'HH:mm MMM DD YYYY'
                                    )}
                                </p>
                                <span className="font-normal">to</span>
                                <p>
                                    {dayjs(event?.eventTime?.[1]).format(
                                        'HH:mm MMM DD YYYY'
                                    )}
                                </p>
                            </div>
                            <div className="flex gap-2 text-slate-500">
                                <Image
                                    src="/icons/location.svg"
                                    alt=""
                                    width={14}
                                    height={14}
                                />
                                <p>
                                    {address?.street}, {address?.ward},{' '}
                                    {address?.district}, {address?.province}
                                </p>
                            </div>
                            <div className="mt-6 text-slate-500">
                                {event?.description}
                            </div>
                        </div>
                    </div>
                </Container>
                <div className="pt-16">
                    <Container>
                        <ListTicket eventId={query?.id} />
                    </Container>
                </div>
                <div className="mt-16">
                    <Container>
                        <ListComment eventId={query?.id} />
                    </Container>
                </div>
            </main>
        </Spin>
    );
};

export default EventDetail;
