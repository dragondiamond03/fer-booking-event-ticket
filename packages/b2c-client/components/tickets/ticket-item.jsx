import React, { useState, useMemo } from 'react';
import BookingModal from '../modals/booking-modal';
import { cn } from 'common/lib/utils';
import { useQuery } from 'common/hooks/useQuery';

const TicketItem = ({ type, area, children, ticketId, disable, quantity }) => {
    const [showBooking, setShowBooking] = useState(false);

    const { data: bookingData, isLoading: bookingLoading } = useQuery(
        `booking?ticket_id=${ticketId}`,
        { id: ticketId }
    );

    const ticketSold = useMemo(() => {
        return bookingData?.filter((item) => item?.status !== 'REJECT')?.length;
    }, [bookingData]);

    console.log(ticketSold);

    return (
        <>
            <div
                className={cn(
                    'flex h-[162px] w-full rounded-lg border',
                    disable || ticketSold >= quantity ? '' : 'cursor-pointer'
                )}
                onClick={() => {
                    if (disable || ticketSold >= quantity) return;
                    setShowBooking(true);
                }}
            >
                <div className="flex-1 p-4">
                    {children}
                    {ticketSold >= quantity && (
                        <div className="mt-2 text-xl font-semibold text-rose-600">
                            Sold out
                        </div>
                    )}
                </div>
                <div className="relative flex h-[100%] items-center justify-center border-l-2 border-dashed px-6">
                    <p className="uppercase">
                        {type === 0 ? 'V' : 'N'}-{area}
                    </p>
                    <div className="absolute -left-[12px] -top-1 z-10 h-[13px] w-[22px] rounded-b-full border-b bg-white" />
                    <div className="absolute -bottom-1 -left-[12px] z-10 h-[13px] w-[22px] rounded-t-full border-t bg-white" />
                </div>
            </div>
            <>
                {showBooking && (
                    <BookingModal
                        isOpen={showBooking}
                        onClose={() => setShowBooking(false)}
                        ticketId={ticketId}
                    />
                )}
            </>
        </>
    );
};

export default TicketItem;
