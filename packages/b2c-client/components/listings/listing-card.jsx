import React, { useMemo } from 'react';
import Image from 'next/image';
import { useQuery } from 'common/hooks/useQuery';
import { Spin } from 'antd';
import { getWard, getDistrict, getProvince } from 'common/lib/getAddress';
import dayjs from 'dayjs';
import { useAuth } from 'common/hooks/useAuth';
import { useRouter } from 'next/router';
import useLoginModal from '~/hooks/useLoginModal';

export const ListingCard = ({ data }) => {
    const router = useRouter();

    const auth = useAuth('client');

    const { onOpen } = useLoginModal();

    const { data: type, isLoading } = useQuery(
        `eventType?id=${data?.eventTypeId}`,
        {
            id: data?.eventTypeId,
        }
    );

    const address = useMemo(() => {
        return {
            street: data?.street || null,
            ward: data?.wardId ? getWard(data?.wardId)?.name : null,
            district: data?.districtId
                ? getDistrict(data?.districtId)?.name
                : null,
            province: data?.provinceId
                ? getProvince(data?.provinceId)?.name
                : null,
        };
    }, [data]);

    return (
        <Spin spinning={isLoading}>
            <div
                className="group col-span-1 cursor-pointer"
                onClick={() => {
                    if (!auth) {
                        onOpen();
                    } else {
                        router.push(`/events/${data?.id}`);
                    }
                }}
                role="presentation"
            >
                <div className="flex w-full flex-col gap-1">
                    <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                        <Image
                            alt="Listing"
                            className="h-full w-full object-cover transition group-hover:scale-110"
                            width={40}
                            height={40}
                            src={data?.image?.[0]}
                        />
                        {data?.bigEvent && (
                            <div className="absolute left-3 top-3 rounded-3xl bg-white px-3.5 py-0.5 font-medium opacity-90">
                                Outstanding
                            </div>
                        )}
                    </div>
                    <div className="text-lg font-semibold">{data?.name}</div>
                    <div className="font-light text-neutral-500">
                        {type?.[0]?.name}
                    </div>
                    <div>
                        {address?.street}, {address?.ward}, {address?.district},{' '}
                        {address?.province}
                    </div>
                    <div className="font-light text-neutral-500">
                        <p>
                            From:{' '}
                            {dayjs(data?.eventTime?.[0]).format(
                                'HH:mm MMM DD YYYY'
                            )}
                        </p>
                        <p>
                            To:{' '}
                            {dayjs(data?.eventTime?.[1]).format(
                                'HH:mm MMM DD YYYY'
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </Spin>
    );
};
