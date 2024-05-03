import { useQuery } from 'common/hooks/useQuery';
import Image from 'next/image';
import React, { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { CalendarFilled } from '@ant-design/icons';
import { getWard, getDistrict, getProvince } from 'common/lib/getAddress';
import { currencyFormatter, cn } from 'common/lib/utils';
import { Skeleton } from 'antd';
import TicketQrModal from '../modals/ticket-qr-modal';
import { VAT } from 'common/constant/constant';
import RateModal from '../modals/rate-modal';

const BookingItemSkeleton = () => {
    return (
        <div className="flex flex-1 gap-4">
            <div>
                <Skeleton.Image
                    active
                    style={{
                        width: 160,
                        height: 140,
                    }}
                />
            </div>
            <div className="flex-1">
                <Skeleton active />
            </div>
        </div>
    );
};

const BookingItem = ({ bookingData }) => {
    const { data: ticketData, ticketLoading } = useQuery(
        `eventTikets/${bookingData?.ticket_id}`,
        { id: bookingData?.ticket_id }
    );

    const { data: eventData, isLoading: eventLoading } = useQuery(
        `events/${bookingData?.event_id}`,
        { id: bookingData?.event_id }
    );

    const { data: type } = useQuery(`eventType?id=${eventData?.eventTypeId}`, {
        id: eventData?.eventTypeId,
    });

    const { data: booking, isLoading: bookingLoading } = useQuery(
        `booking/${bookingData?.id}`,
        { id: bookingData?.id }
    );

    const [showQrCode, setShowQrCode] = useState(false);
    const [showRateEvent, setShowRateEvent] = useState(false);

    const address = useMemo(() => {
        return {
            street: eventData?.street || null,
            ward: eventData?.wardId ? getWard(eventData?.wardId)?.name : null,
            district: eventData?.districtId
                ? getDistrict(eventData?.districtId)?.name
                : null,
            province: eventData?.provinceId
                ? getProvince(eventData?.provinceId)?.name
                : null,
        };
    }, [eventData]);

    const status = useMemo(() => {
        switch (bookingData?.status) {
            case 'APPROVED':
                return <span className="text-green-600">APPROVED</span>;
            case 'PENDING':
                return <span className="text-yellow-600">PENDING</span>;
            case 'REJECT':
                return <span className="text-rose-600">REJECTED</span>;
            default:
                return null;
        }
    }, [bookingData?.status]);

    if (ticketLoading || eventLoading || bookingLoading) {
        return <BookingItemSkeleton />;
    }

    return (
        <>
            <div
                className={cn(
                    'flex flex-1 gap-4 px-2 py-4',
                    bookingData?.status === 'APPROVED' &&
                        'cursor-pointer hover:bg-neutral-100'
                )}
                onClick={() => {
                    if (bookingData?.status === 'APPROVED') {
                        setShowQrCode(true);
                    }
                }}
            >
                <Image
                    src={eventData?.image?.[0]}
                    alt=""
                    width={160}
                    height={120}
                    className="rounded-md object-cover"
                    style={{
                        width: 160,
                        height: 140,
                    }}
                />
                <div className="flex-1">
                    <div className="text-[16px] font-semibold">
                        {eventData?.name}
                    </div>
                    <p className="text-slate-400">#{type?.[0]?.name}</p>
                    <div className="flex gap-2 font-medium text-neutral-500">
                        <CalendarFilled />
                        <p>
                            {dayjs(eventData?.eventTime?.[0]).format(
                                'HH:mm MMM DD YYYY'
                            )}
                        </p>
                        <span className="font-normal">to</span>
                        <p>
                            {dayjs(eventData?.eventTime?.[1]).format(
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
                    <div className="font-medium text-slate-500">
                        {ticketData?.name} - Area {ticketData?.area}
                    </div>
                    <div className="text-[16px] font-semibold text-rose-500">
                        {currencyFormatter(
                            Number(ticketData?.price) * (VAT / 100) +
                                Number(ticketData?.price)
                        )}
                    </div>
                </div>
                <div>
                    {status && <div className="font-semibold">{status}</div>}
                </div>
            </div>
            <>
                {showQrCode && bookingData && (
                    <TicketQrModal
                        isOpen={showQrCode}
                        data={booking}
                        onClose={() => setShowQrCode(false)}
                        onSubmit={() => {
                            setShowQrCode(false);
                            setShowRateEvent(true);
                        }}
                    />
                )}
                {showRateEvent && bookingData && (
                    <RateModal
                        isOpen={showRateEvent}
                        bookingData={booking}
                        onClose={() => {
                            setShowRateEvent(false);
                        }}
                    />
                )}
            </>
        </>
    );
};

export default BookingItem;
