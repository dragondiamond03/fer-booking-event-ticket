import React, { useMemo, useEffect, useState } from 'react';
import { Select, Spin } from 'antd';
import Container from '~/components/container';
import { useQuery } from 'common/hooks/useQuery';
import { currencyFormatter } from 'common/lib/utils';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    RadialLinearScale,
    Title,
} from 'chart.js';
import { Doughnut, PolarArea } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, RadialLinearScale, Title);

import {
    DollarOutlined,
    ShoppingOutlined,
    UserOutlined,
} from '@ant-design/icons';

const Report = () => {
    const {
        data: listBooking,
        reload,
        isLoading: bookingLoading,
    } = useQuery('booking');
    const {
        data: listUser,
        reload: userReload,
        isLoading: userLoading,
    } = useQuery('users');
    const {
        data: listEventTicket,
        reload: eventTicketReload,
        isLoading: eventTicketLoading,
    } = useQuery('eventTikets');
    const {
        data: listEventType,
        reload: eventTypeReload,
        isLoading: eventTypeLoading,
    } = useQuery('eventType');
    const {
        data: listEvent,
        reload: eventReload,
        isLoading: eventLoading,
    } = useQuery('events');

    const [eventId, setEventId] = useState();

    const numUser = useMemo(() => {
        return listUser?.length;
    }, [listUser]);

    const numTicketSolded = useMemo(() => {
        const approvedTickets = listBooking?.filter(
            (item) => item.status === 'APPROVED'
        );
        return approvedTickets?.length || 0;
    }, [listBooking]);

    const revenue = useMemo(() => {
        let result = 0;
        const approvedTickets = listBooking?.filter(
            (item) => item.status === 'APPROVED'
        );
        approvedTickets?.map((itemTicket) => {
            listEventTicket?.map((item) => {
                if (itemTicket.ticket_id == item.id) {
                    result += item.price;
                }
            });
        });
        return result;
    }, [listEventTicket, listBooking]);

    const dataSetNumberTicket = useMemo(() => {
        let numberTicketVip = 0;
        let numberTicketNormal = 0;
        const approvedTickets = listBooking?.filter(
            (item) => item.event_id === eventId && item.status === 'APPROVED'
        );
        approvedTickets?.forEach((itemTicket) => {
            const matchedEventTicket = listEventTicket.find(
                (itemEventTicket) => itemTicket.ticket_id === itemEventTicket.id
            );
            if (matchedEventTicket) {
                matchedEventTicket.type === 0
                    ? numberTicketVip++
                    : numberTicketNormal++;
            }
        });
        const event = listEvent?.find((item) => item.id === eventId);
        const data = [
            event?.vipTicket - numberTicketVip,
            numberTicketVip,
            event?.normalTicket - numberTicketNormal,
            numberTicketNormal,
        ];
        return data || [0, 0, 0, 0];
    }, [listBooking, listEventTicket, eventId, listEvent]);

    const dataTicket = {
        labels: [
            'Number of unsold vip tickets',
            'Number of vip tickets sold',
            'Number of unsold normal tickets',
            'Number of normal tickets sold',
        ],
        datasets: [
            {
                label: 'number ticket',
                data: dataSetNumberTicket,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const dataSetNumberType = useMemo(() => {
        const ticketCountByEventType = {};
        listBooking?.forEach((booking) => {
            const matchedEvent = listEvent?.find(
                (event) => event?.id === booking?.event_id
            );
            if (matchedEvent) {
                const eventTypeId = matchedEvent?.eventTypeId;
                const eventType = listEventType?.find(
                    (eventType) => eventType?.id === eventTypeId
                );
                if (eventType) {
                    const eventId = eventType?.id;
                    if (!ticketCountByEventType[eventId]) {
                        ticketCountByEventType[eventId] = 0;
                    }
                    ticketCountByEventType[eventId]++;
                }
            }
        });

        const combinedData = listEventType?.map((eventType) => ({
            name: eventType?.name,
            tickets: ticketCountByEventType[eventType.id] || 0,
        }));

        return combinedData;
    }, [listBooking, listEvent, listEventType]);

    const randomColor = () => {
        return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`;
    };

    const dataType = {
        labels: dataSetNumberType?.map((item) => item.name),
        datasets: [
            {
                label: 'number ticket soled',
                data: dataSetNumberType?.map((item) => item.tickets),
                backgroundColor: dataSetNumberType?.map(() => randomColor()),
                borderColor: dataSetNumberType?.map(() => randomColor()),
                borderWidth: 1,
            },
        ],
    };
    useEffect(() => {
        setEventId(listEvent?.[0].id);
        return () => {
            setEventId();
        };
    }, [listEvent]);

    const handleChangeEvent = (values) => {
        setEventId(values);
    };

    return (
        <Spin
            spinning={
                bookingLoading ||
                userLoading ||
                eventTicketLoading ||
                eventLoading ||
                eventTypeLoading
            }
        >
            <Container>
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">
                        Reporting & Analysis Management
                    </h2>
                </div>
                <div className="mt-5 w-full">
                    <div className="my-4 flex flex-row gap-4">
                        <div className="flex w-[15rem] flex-row justify-center gap-2 rounded-md bg-[#f8f8f8] px-4 py-8">
                            <ShoppingOutlined className="h-max w-max rounded-[50%] bg-[#D6FFD2] p-2 text-[2rem] text-[#2F8324]" />
                            <div className="w-max">
                                <h3 className="text-md font-medium">
                                    Tickets Sold
                                </h3>
                                <h3 className="text-xl font-medium">
                                    {numTicketSolded}
                                </h3>
                            </div>
                        </div>
                        <div className="flex w-[15rem] flex-row justify-center gap-2 rounded-md bg-[#f8f8f8] px-4 py-8">
                            <UserOutlined className="h-max w-max rounded-[50%] bg-[#D4FEFE] p-2 text-[2rem] text-[#B26FC1]" />
                            <div className="w-max">
                                <h3 className="text-md font-medium">
                                    Customer
                                </h3>
                                <h3 className="text-xl font-medium">
                                    {numUser}
                                </h3>
                            </div>
                        </div>
                        <div className="mw-[15rem] flex flex-row justify-center gap-2 rounded-md bg-[#f8f8f8] px-4 py-8">
                            <DollarOutlined className="h-max w-max rounded-[50%] bg-[#FFC8C4] p-2 text-[2rem] text-[#ff3d3d]" />
                            <div className="w-max">
                                <h3 className="text-md font-medium">Revenue</h3>
                                <h3 className="text-xl font-medium">
                                    {currencyFormatter(revenue)}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-3">
                        <div className="col-span-6 border border-dotted p-4 ">
                            <h3 className="text-md col-span-6 font-semibold">
                                Report sold tickets
                            </h3>
                            <div className="mw-[20rem] mt-5">
                                <Select
                                    className="my-4 w-full"
                                    value={eventId}
                                    onChange={handleChangeEvent}
                                >
                                    {listEvent?.map((item) => (
                                        <Select.Option
                                            key={item?.id}
                                            value={item?.id}
                                        >
                                            {item?.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                                <Doughnut data={dataTicket} />
                            </div>
                        </div>
                        <div className="col-span-6 border border-dotted p-4 ">
                            <h3 className="text-md col-span-6 font-semibold">
                                Trend report
                            </h3>
                            <div className="mw-[20rem] mt-5">
                                <PolarArea data={dataType} />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Spin>
    );
};
export default Report;
