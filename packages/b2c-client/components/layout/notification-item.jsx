import { useMutation } from 'common/hooks/useMutation';
import { useQuery } from 'common/hooks/useQuery';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

const NotificationItem = ({ data, onClose, onReload }) => {
    const router = useRouter();

    const { data: bookingData, isLoading: bookingLoading } = useQuery(
        `booking/${data?.booking_id}`,
        { id: data?.booking_id }
    );

    const { data: eventData, isLoading: eventLoading } = useQuery(
        `events/${bookingData?.event_id}`,
        { id: bookingData?.event_id }
    );

    const [trigger] = useMutation();

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

    const handleClickNotification = () => {
        router.push('/my-page/booking-detail');
        trigger('PATCH', `notifications/${data?.id}`, { status: 'SEEN' });
        onClose?.();
        setTimeout(() => {
            onReload?.();
        }, 200);
    };

    return (
        <div
            className="flex cursor-pointer gap-2 bg-white p-3 transition hover:bg-neutral-100"
            onClick={handleClickNotification}
        >
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
            <div className="flex items-center justify-center">
                <div className="h-[10px] w-[10px] rounded-full bg-blue-600" />
            </div>
        </div>
    );
};

export default NotificationItem;
