import React, { useMemo } from 'react';
import BookingItem from './booking-item';
import { useQuery } from 'common/hooks/useQuery';
import { useAuth } from 'common/hooks/useAuth';
import { List, Spin } from 'antd';

const BookingRejected = () => {
    const auth = useAuth('client');
    const { data, isLoading } = useQuery(
        `booking?status=REJECT&user_id=${auth?.id}`,
        { user_id: auth?.id }
    );

    const bookingPending = useMemo(() => {
        return data?.sort(
            (a, b) =>
                new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
        );
    }, [data]);
    return (
        <Spin spinning={isLoading}>
            <div>
                <List
                    pagination={{
                        position: 'bottom',
                        align: 'center',
                        pageSize: 5,
                    }}
                    dataSource={bookingPending}
                    renderItem={(item) => (
                        <List.Item className="!p-0">
                            <BookingItem bookingData={item} />
                        </List.Item>
                    )}
                />
            </div>
        </Spin>
    );
};

export default BookingRejected;
