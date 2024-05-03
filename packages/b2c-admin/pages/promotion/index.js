import { Button, Table, Space, Tooltip, Spin } from 'antd';
import Link from 'next/link';
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    ShareAltOutlined,
} from '@ant-design/icons';
import { useQuery } from 'common/hooks/useQuery';
import { useMemo } from 'react';
import { getType } from 'common/lib/getType';
import Container from '~/components/container';
import { AlertShare } from 'common/components/alert-share';
import DeletePromotion from '~/components/promontion/delete-promotion';

const Promotion = () => {
    const {
        data: listPromotion,
        reload,
        isLoading: promotionLoading,
    } = useQuery('promotions');

    const {
        data: listEvent,
        reload: eventReload,
        isLoading: eventLoading,
    } = useQuery('events');

    const { data: listType, isLoading: typeLoading } = useQuery('eventType');

    const dataSource = useMemo(() => {
        return listPromotion?.map((item) => {
            return {
                key: item?.id,
                title: item?.title,
                eventName: getType(item?.eventId, listEvent),
                description: item?.description,
                linkEvent: item?.linkEvent,
            };
        });
    }, [listEvent, listPromotion]);

    const columns = [
        {
            title: 'Promotion title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Event name',
            dataIndex: 'eventName',
            key: 'eventName',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip
                        title="Edit promotion"
                        color="#108ee9"
                        arrow={false}
                    >
                        <Link href={`/promotion/edit/${record.key}`}>
                            <Button
                                type="primary"
                                icon={<EditOutlined />}
                                shape="circle"
                            />
                        </Link>
                    </Tooltip>

                    <DeletePromotion
                        id={record?.key}
                        successCallback={reload}
                    />
                    <Tooltip title="Share promotion" arrow={false} color="blue">
                        <AlertShare
                            icon={<ShareAltOutlined />}
                            shape="circle"
                            message="Share promotion"
                            linkShare={record?.linkEvent}
                        />
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
                        Promotions Management
                    </h2>
                    <div>
                        <Link href="/promotion/create">
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
};

export default Promotion;
