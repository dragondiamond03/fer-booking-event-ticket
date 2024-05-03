import React from 'react';
import { Button, Spin, Table, Space, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useQuery } from 'common/hooks/useQuery';
import AdminForm from './admin-form';

const AdminList = () => {
    const { data, isLoading, reload } = useQuery('admin');
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
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (_, { role }) => (
                <>
                    <Tag color="green">{role?.toUpperCase()}</Tag>
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <AdminForm
                        adminId={record?.id}
                        title="Edit account admin"
                        successCallback={reload}
                    />
                </Space>
            ),
            width: '20%',
        },
    ];

    return (
        <Spin spinning={isLoading}>
            <div className="flex justify-end">
                <AdminForm
                    successCallback={reload}
                    label="Create"
                    title="Create account admin"
                />
            </div>
            <div className="mt-5">
                <Table
                    pagination={{ pageSize: 5 }}
                    columns={columns}
                    dataSource={data}
                />
            </div>
        </Spin>
    );
};

export default AdminList;
