import React from 'react';
import Modal from './modal';
import usePaymentModal from '~/hooks/usePaymentModal';
import Image from 'next/image';
import { PAYMENT_ACCOUNT } from 'common/constant/constant';

const PaymentModal = () => {
    const { isOpen, onClose, ticketId } = usePaymentModal();

    const bodyContent = (
        <div className="flex flex-col items-center">
            <div className="text-lg font-medium ">
                Payment for ticket: {ticketId}
            </div>
            <Image
                src="/images/payment.jpg"
                width={200}
                height={200}
                alt="payment"
            />
            <div className="flex flex-col items-center gap-1">
                <p className="text-lg font-semibold text-slate-500">
                    Please pay within 24 hours or your ticket will be cancelled!
                </p>
                <p>
                    <span className="font-medium text-slate-500">
                        Account number:
                    </span>{' '}
                    {PAYMENT_ACCOUNT.account_number}
                </p>
                <p>
                    <span className="font-medium text-slate-500">Owner:</span>{' '}
                    {PAYMENT_ACCOUNT.owner}
                </p>
                <p>
                    <span className="font-medium text-slate-500">
                        Money transfer content:
                    </span>{' '}
                    &#91;<span className="font-medium">Your name</span>&#93;
                    payment for &#91;
                    <span className="font-medium">Ticket ID</span>&#93;
                </p>
            </div>
        </div>
    );

    return (
        <Modal
            actionLabel="Submit"
            body={bodyContent}
            isOpen={isOpen}
            onClose={onClose}
            title="Payment"
        />
    );
};

export default PaymentModal;
