import { Button, Table, Space, Tooltip, Spin, Tag } from 'antd';
import Link from 'next/link';
import { EyeOutlined } from '@ant-design/icons';
import { useQuery } from 'common/hooks/useQuery';
import { useMemo } from 'react';
import { getWard, getDistrict, getProvince } from 'common/lib/getAddress';
import { getType } from 'common/lib/getType';
import Container from '~/components/container';

const Tickets = () => {
    const {
        data: listEvent,
        reload,
        isLoading: eventLoading,
    } = useQuery('events');

    const { data: listType, isLoading: typeLoading } = useQuery('eventType');

    const dataSource = useMemo(() => {
        return listEvent?.map((item) => {
            return {
                key: item?.id,
                name: item?.name,
                eventTypeId: getType(item?.eventTypeId, listType),
                address: `${item?.street}, ${getWard(item?.wardId)?.name}, ${getDistrict(item?.districtId)?.name}, ${getProvince(item?.provinceId)?.name}`,
                outstanding: item?.bigEvent,
            };
        });
    }, [listEvent, listType]);

    const columns = [
        {
            title: 'Event name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Type',
            dataIndex: 'eventTypeId',
            key: 'type',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Outstanding',
            dataIndex: 'outstanding',
            key: 'outstanding',
            render: (_, { outstanding }) => (
                <>
                    <Tag
                        color={outstanding ? 'green' : 'red'}
                        key={outstanding}
                    >
                        {outstanding ? 'TRUE' : 'FALSE'}
                    </Tag>
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="Show tickets" color="#108ee9" arrow={false}>
                        <Link href={`/tickets/view-detail/${record.key}`}>
                            <Button
                                type="primary"
                                icon={<EyeOutlined />}
                                shape="circle"
                            />
                        </Link>
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <Spin spinning={eventLoading || typeLoading}>
            <Container>
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">
                        Tickets Management
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
};
export default Tickets;
