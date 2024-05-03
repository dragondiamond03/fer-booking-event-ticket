import React from 'react';
import Tab from 'common/components/tab';
import BookingApproved from '~/components/my-page/booking-approved';
import BookingPending from '~/components/my-page/booking-pending';
import BookingRejected from '~/components/my-page/booking-rejected';
import MyPageHeader from '~/components/my-page/my-page-header';

const BookingDetail = () => {
    const items = [
        {
            key: '1',
            label: <div className="text-green-700">approved</div>,
            children: <BookingApproved />,
        },
        {
            key: '2',
            label: <div className="text-yellow-700">pending</div>,
            children: <BookingPending />,
        },
        {
            key: '3',
            label: <div className="text-rose-700">rejected</div>,
            children: <BookingRejected />,
        },
    ];
    return (
        <div>
            <MyPageHeader title="Booking Detail" />
            <Tab items={items} />
        </div>
    );
};

export default BookingDetail;
