import React from 'react';
import Container from '~/components/container';
import { Header } from '~/components/header';
import { Tabs } from 'antd';
import UserList from '~/components/users/user-list';
import AdminList from '~/components/users/admin-list';

const items = [
    {
        key: '1',
        label: 'Users',
        children: <UserList />,
    },
    {
        key: '2',
        label: 'Admin',
        children: <AdminList />,
    },
];

const UsersManagement = () => {
    return (
        <Container>
            <Header title="Users Management" />
            <Tabs defaultActiveKey="1" items={items} />
        </Container>
    );
};

export default UsersManagement;
