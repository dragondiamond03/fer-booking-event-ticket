import { Button, Table, Space, Tooltip, Spin } from 'antd';
import Link from 'next/link';
import { LeftOutlined } from '@ant-design/icons';
import { useMemo } from 'react';
import Container from '~/components/container';
import { useRouter } from 'next/router';
import { useQuery } from 'common/hooks/useQuery';
import TicketForm from '~/components/Ticket/ticket-form';
import { currencyFormatter } from 'common/lib/utils';
const Tickets = () => {
    const { query } = useRouter();
    const { id } = query;
    const {
        data: listTicket,
        isLoading: ticketLoading,
        reload,
    } = useQuery(`eventTikets?event_id=${id}`);

    const dataSource = useMemo(() => {
        return listTicket?.map((item) => {
            return {
                key: item?.id,
                name: item?.name,
                type: item?.type === 0 ? 'Vip' : 'Normal',
                quantity: item?.quantity,
                area: item.area,
                price: currencyFormatter(Number(item?.price)),
            };
        });
    }, [listTicket, id]);

    const columns = [
        {
            title: 'Ticket name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Ticket type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'area',
            dataIndex: 'area',
            key: 'area',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <TicketForm
                        title="Edit ticket"
                        ticketId={record?.key}
                        event_id={id}
                        successCallback={reload}
                    />
                </Space>
            ),
        },
    ];

    return (
        <Spin spinning={ticketLoading}>
            <Container>
                <div className="mb-2">
                    <Link href="/tickets">
                        <Button icon={<LeftOutlined />}>Back</Button>
                    </Link>
                </div>

                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">
                        Tickets Management
                    </h2>
                    <TicketForm
                        successCallback={reload}
                        event_id={id}
                        label="Create"
                        title="Create ticket"
                    />
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
};
export default Tickets;
