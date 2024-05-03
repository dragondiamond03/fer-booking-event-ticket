import React, { useMemo } from 'react';
import { Table, Space, Spin, Tag } from 'antd';
import Container from '~/components/container';
import { Header } from '~/components/header';
import { useQuery } from 'common/hooks/useQuery';
import EventTypeForm from '~/components/events/event-type-form';

const EventType = () => {
    const { isLoading, data, reload } = useQuery('eventType');

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Show on select',
            dataIndex: 'isShow',
            key: 'isShow',
            render: (_, { isShow }) => (
                <>
                    <Tag color={isShow === '1' ? 'green' : 'red'}>
                        {isShow === '1' ? 'SHOW' : 'HIDE'}
                    </Tag>
                </>
            ),
            filters: [
                {
                    text: 'Show',
                    value: '1',
                },
                {
                    text: 'Hide',
                    value: '0',
                },
            ],
            onFilter: (value, record) => {
                return record?.isShow == value;
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <EventTypeForm
                        typeId={record?.id}
                        title="Edit event type"
                        successCallback={reload}
                    />
                </Space>
            ),
        },
    ];

    return (
        <Spin spinning={isLoading}>
            <Container>
                <div className="flex justify-between">
                    <Header title="Events Type Management" />
                    <EventTypeForm
                        successCallback={reload}
                        label="Create"
                        title="Create event type"
                    />
                </div>
                <Table
                    pagination={{ pageSize: 5 }}
                    dataSource={data}
                    columns={columns}
                />
            </Container>
        </Spin>
    );
};

export default EventType;
