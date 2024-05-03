import { useQuery } from 'common/hooks/useQuery';
import Image from 'next/image';
import React, { useMemo } from 'react';

const NotificationBoxItem = ({ data }) => {
    const { data: bookingData } = useQuery(`booking/${data?.booking_id}`, {
        id: data?.booking_id,
    });

    const { data: eventData } = useQuery(`events/${bookingData?.event_id}`, {
        id: bookingData?.event_id,
    });

    const status = useMemo(() => {
        switch (bookingData?.status) {
            case 'PENDING':
                return (
                    <span className="font-medium text-yellow-600">PENDING</span>
                );
            case 'APPROVED':
                return (
                    <span className="font-medium text-green-600">APPROVED</span>
                );
            case 'REJECT':
                return (
                    <span className="font-medium text-rose-600">REJECT</span>
                );
        }
    }, [bookingData]);

    return (
        <div className="flex gap-4 bg-white p-3">
            <div>
                <Image
                    className="rounded-full object-cover"
                    src={eventData?.image?.[0]}
                    width={40}
                    height={40}
                    alt=""
                    style={{
                        width: 60,
                        height: 60,
                    }}
                />
            </div>
            <div className="flex-1 text-sm">
                <p className="font-semibold">{eventData?.name}</p>
                <p>
                    Your ticket &#91;
                    <span className="font-medium">{data?.ticket_id}</span>&#93;
                    has been {status}{' '}
                </p>
                {data?.content && (
                    <p>
                        <span className="font-medium text-slate-500">
                            Note:{' '}
                        </span>
                        {data?.content}
                    </p>
                )}
            </div>
            {data?.status === 'NEW' && (
                <div className="flex items-center justify-center">
                    <div className="h-[10px] w-[10px] rounded-full bg-blue-600" />
                </div>
            )}
        </div>
    );
};

export default NotificationBoxItem;
