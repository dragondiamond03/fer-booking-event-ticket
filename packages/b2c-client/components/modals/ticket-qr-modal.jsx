import React from 'react';
import Modal from './modal';
import QRCode from 'react-qr-code';
import { useQuery } from 'common/hooks/useQuery';

const TicketQrModal = ({ isOpen, onClose, data, onSubmit }) => {
    const { data: bookingData } = useQuery(`booking/${data?.id}`, {
        id: data?.id,
    });

    const bodyContent = (
        <div className="flex flex-col gap-3">
            <div className="text-center text-xl font-semibold text-slate-500">
                Your ticket
                <span className="font-medium">
                    {' '}
                    &#91;
                    {data?.ticket_id}&#93;
                </span>
            </div>
            <div className="flex items-center justify-center">
                {data && <QRCode value={JSON.stringify(data)} />}
            </div>
            <div className="text-center text-lg font-semibold text-slate-500">
                Please show this qr code to the receptionist
            </div>
        </div>
    );

    return (
        <Modal
            actionLabel={
                bookingData?.isRate
                    ? 'You wrote review for this tickets'
                    : 'Rate'
            }
            body={bodyContent}
            isOpen={isOpen}
            onClose={onClose}
            title="Your Ticket"
            onSubmit={onSubmit}
            disabledSubmit={bookingData?.isRate}
        />
    );
};

export default TicketQrModal;
