import React, { useEffect, useMemo } from 'react';
import Modal from './modal';
import TicketItem from '../tickets/ticket-item';
import { useQuery } from 'common/hooks/useQuery';
import { currencyFormatter } from 'common/lib/utils';
import { useAuth } from 'common/hooks/useAuth';
import { VAT } from 'common/constant/constant';
import { useMutation } from 'common/hooks/useMutation';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import usePaymentModal from '~/hooks/usePaymentModal';
import { useRouter } from 'next/router';

const BookingModal = ({ isOpen, onClose, ticketId }) => {
    const auth = useAuth('client');
    const { query } = useRouter();
    const { data: ticketData, isLoading: getTicketLoading } = useQuery(
        `eventTikets?id=${ticketId}`,
        { id: ticketId }
    );

    const [trigger, { isLoading, data }] = useMutation();

    const { onOpen } = usePaymentModal();

    useEffect(() => {
        if (data) {
            toast.success('Booking ticket successfully!');
            onClose?.();
            setTimeout(() => {
                onOpen(data?.id);
            }, 200);
        }
    }, [data]);

    const ticket = useMemo(() => {
        return ticketData?.[0];
    }, [ticketData]);

    const handleSubmit = () => {
        const submitObject = {
            event_id: query?.id,
            ticket_id: ticketId,
            user_id: auth?.id,
            status: 'PENDING',
            createAt: dayjs().format('DD/MM/YYYY HH:mm:ss'),
        };

        trigger('POST', 'booking', submitObject);
    };

    const bodyContent = (
        <div>
            <div>
                <TicketItem type={ticket?.type} area={ticket?.area} disable>
                    <div className="flex flex-col gap-1.5">
                        <div className="text-xl font-semibold text-slate-600">
                            {currencyFormatter(ticket?.price)}
                        </div>
                        <div className="flex gap-2">
                            <div className="font-semibold text-slate-500">
                                {ticket?.name}
                            </div>
                            <div>-</div>
                            <div className="text-slate-500">
                                Area {ticket?.area}
                            </div>
                        </div>
                        <div className="text-slate-500">
                            <span className="text-sm">Number of tickets: </span>
                            <span className="font-medium">
                                {ticket?.quantity}
                            </span>
                        </div>
                    </div>
                </TicketItem>
            </div>
            <div className="mt-4 flex flex-col gap-2">
                <div className="flex justify-between">
                    <div className="font-medium text-slate-500">
                        Customer name:
                    </div>
                    <div>{auth?.name}</div>
                </div>
                <div className="flex justify-between">
                    <div className="font-medium text-slate-500">
                        Ticket name:
                    </div>
                    <div>{ticket?.name}</div>
                </div>
                <div className="flex justify-between">
                    <div className="font-medium text-slate-500">Area:</div>
                    <div>{ticket?.area}</div>
                </div>
                <div className="flex justify-between">
                    <div className="font-medium text-slate-500">Price:</div>
                    <div className="font-medium text-red-500">
                        {currencyFormatter(ticket?.price)}
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="font-medium text-slate-500">VAT:</div>
                    <div className="font-medium text-red-500">{VAT}%</div>
                </div>
                <hr />
                <div className="flex justify-between">
                    <div className="font-medium text-slate-500">
                        Total price:
                    </div>
                    <div className="font-medium text-red-500">
                        {currencyFormatter(
                            ticket?.price + ticket?.price * (VAT / 100)
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal
            actionLabel="Submit"
            body={bodyContent}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            title="Booking"
            disabled={getTicketLoading || isLoading}
        />
    );
};

export default BookingModal;
