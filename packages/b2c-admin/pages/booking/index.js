import { Table, Space, Tag, Spin } from 'antd';
import { useQuery } from 'common/hooks/useQuery';
import { useMemo } from 'react';
import { getType, getValueByObjKey } from 'common/lib/getType';
import Container from '~/components/container';
import BookingForm from '~/components/booking/booking-form';

import { useColumnSearch } from 'common/components/column-search-props';
import { STATUS_BOOKING } from 'common/constant/constant';
export default function Booking() {
    const { getColumnSearchProps } = useColumnSearch();
    const {
        data: listBooking,
        reload,
        isLoading: bookingLoading,
    } = useQuery('booking');
    const { data: listUser, isLoading: userLoading } = useQuery('users');
    const { data: listTicket, isLoading: ticketLoading } =
        useQuery('eventTikets');
    const { data: listEvent, isLoading: eventLoading } = useQuery('events');

    const dataEventFilter = useMemo(() => {
        if (listBooking && listEvent) {
            const uniqueEvents = [
                ...new Set(listBooking.map((item) => item.event_id)),
            ]
                .map((eventId) => {
                    const event = listEvent.find(
                        (event) => event.id === eventId
                    );
                    return {
                        text: event ? event.name : '',
                        value: event ? event.name : '',
                    };
                })
                .filter((event) => event.text);

            return uniqueEvents;
        }
        return [];
    }, [listBooking, listEvent]);

    const dataSource = useMemo(() => {
        return listBooking?.map((item) => {
            return {
                key: item?.id,
                eventName: getType(item?.event_id, listEvent),
                ticketName: getType(item?.ticket_id, listTicket),
                ticketId: item?.ticket_id,
                userName: getType(item?.user_id, listUser),
                user_id: item?.user_id,
                price: getValueByObjKey(item?.ticket_id, listTicket, 'price'),
                status: (
                    <Tag
                        color={
                            item?.status === 'REJECT'
                                ? 'error'
                                : item?.status === 'APPROVED'
                                  ? 'success'
                                  : 'default'
                        }
                        key={item?.status}
                    >
                        {item?.status}
                    </Tag>
                ),
                createAt: item?.createAt,
            };
        });
    }, [listBooking, listUser, listTicket, listEvent]);

    const columns = [
        {
            title: 'id',
            dataIndex: 'key',
            key: 'key',
            ...getColumnSearchProps('key', 'id'),
        },
        {
            title: 'event name',
            dataIndex: 'eventName',
            key: 'eventName',
            filters: dataEventFilter,
            onFilter: (value, record) =>
                record.eventName.toLowerCase().includes(value.toLowerCase()),
        },
        {
            title: 'Ticket name',
            dataIndex: 'ticketName',
            key: 'ticketName',
        },
        {
            title: 'User name',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: STATUS_BOOKING?.map((text) => ({ text, value: text })),
            onFilter: (value, record) => {
                return record.status.key == value;
            },
        },
        {
            title: 'Create At',
            dataIndex: 'createAt',
            key: 'createAt',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <BookingForm
                        dataSource={dataSource}
                        bookingId={record?.key}
                        title="Edit booking"
                        successCallback={reload}
                    />
                </Space>
            ),
        },
    ];

    return (
        <Spin
            spinning={
                bookingLoading || userLoading || ticketLoading || eventLoading
            }
        >
            <Container>
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">
                        Booking Management
                    </h2>
                </div>
                <div className="mt-5">
                    <Table
                        pagination={{ pageSize: 5 }}
                        dataSource={dataSource}
                        columns={columns}
                    />
                </div>
            </Container>
        </Spin>
    );
}
