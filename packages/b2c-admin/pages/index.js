import { Button, Table, Space, Tooltip, Spin, Tag } from 'antd';
import Link from 'next/link';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useQuery } from 'common/hooks/useQuery';
import { useMemo } from 'react';
import { getWard, getDistrict, getProvince } from 'common/lib/getAddress';
import { getType } from 'common/lib/getType';
import DeleteEvent from '~/components/events/delete-event';
import Container from '~/components/container';

export default function Home() {
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
                    <Tooltip title="Edit event" color="#108ee9" arrow={false}>
                        <Link href={`/events/edit/${record.key}`}>
                            <Button
                                type="primary"
                                icon={<EditOutlined />}
                                shape="circle"
                            />
                        </Link>
                    </Tooltip>

                    <DeleteEvent id={record?.key} successCallback={reload} />
                </Space>
            ),
        },
    ];

    return (
        <Spin spinning={eventLoading || typeLoading}>
            <Container>
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Events Management</h2>
                    <div>
                        <Link href="/events/create">
                            <Button type="primary" icon={<PlusOutlined />}>
                                Create
                            </Button>
                        </Link>
                    </div>
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
