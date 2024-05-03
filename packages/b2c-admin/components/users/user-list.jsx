import React from 'react';
import { Button, Spin, Table, Space, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useQuery } from 'common/hooks/useQuery';
import UserForm from './admin-form';
//   "users": [
//     {
//       "id": "293b",
//       "name": "Hoang Minh Chinh",
//       "email": "chinhhm@gmail.com",
//       "phone": "0912345678",
//       "username": "test",
//       "password": "$2a$10$24ALY1Zt7VaegX.z4vmhaOFwb6.xa0yTWbl161NCFl4HsDsP8Itwq",
//       "avatar":
const UserList = () => {
    const { data, isLoading, reload } = useQuery('users');
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
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <UserForm
                        UserId={record?.id}
                        title="Edit account User"
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
                <UserForm
                    successCallback={reload}
                    label="Create"
                    title="Create account User"
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

export default UserList;
