import Image from 'next/image';
import React, { useMemo } from 'react';
import { getWard, getDistrict, getProvince } from 'common/lib/getAddress';
import dayjs from 'dayjs';
import { CalendarFilled } from '@ant-design/icons';
import { useQuery } from 'common/hooks/useQuery';
import { useRouter } from 'next/router';
import { useAuth } from 'common/hooks/useAuth';
import useLoginModal from '~/hooks/useLoginModal';

const RecommendCard = ({ data }) => {
    const router = useRouter();

    const auth = useAuth('client');

    const { onOpen } = useLoginModal();

    const { data: type } = useQuery(`eventType?id=${data?.eventTypeId}`, {
        id: data?.eventTypeId,
    });

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
        <div>
            <div
                className="group relative h-[420px] w-[384px] cursor-pointer rounded-xl"
                onClick={() => {
                    if (!auth) {
                        onOpen();
                    } else {
                        router.push(`events/${data?.id}`);
                    }
                }}
            >
                <div className="aspect-square h-[420px] w-[384px] overflow-hidden rounded-xl">
                    <Image
                        className="h-full w-full rounded-xl object-cover transition group-hover:scale-110"
                        src={data?.image?.[0]}
                        width={384}
                        height={420}
                        alt={data?.name}
                    />
                </div>
                <div className="absolute -bottom-20 right-0 flex h-[198px] w-[330px] flex-col gap-2 rounded-bl-xl rounded-tr-xl bg-white p-4 shadow-lg">
                    <p className="text-xl font-semibold">{data?.name}</p>
                    <p className="flex gap-1 text-slate-500">
                        <Image
                            src="/icons/location.svg"
                            width={12}
                            height={12}
                            alt=""
                        />
                        {address?.street}, {address?.ward}, {address?.district},{' '}
                        {address?.province}
                    </p>
                    <div className="flex font-medium text-neutral-500">
                        <CalendarFilled className="mr-1" />
                        <p>
                            {dayjs(data?.eventTime?.[0]).format(
                                'HH:mm MMM DD YYYY'
                            )}
                        </p>
                        <span className="font-normal">-</span>
                        <p>
                            {dayjs(data?.eventTime?.[1]).format(
                                'HH:mm MMM DD YYYY'
                            )}
                        </p>
                    </div>
                    <p className="up mt-4 text-end text-xl font-semibold text-slate-600">
                        {type?.[0]?.name}
                    </p>
                </div>
            </div>
            <div className="h-[98px]"></div>
        </div>
    );
};

export default RecommendCard;
