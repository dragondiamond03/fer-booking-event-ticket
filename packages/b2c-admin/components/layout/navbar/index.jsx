import { Button, Dropdown, Divider, Space } from 'antd';
import Link from 'next/link';
import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const Navbar = () => {
    const router = useRouter();

    const handleLogout = async () => {
        await Cookies.remove('accessToken');

        setTimeout(() => {
            router.replace('/auth');
        }, 200);
    };

    const MENU_ITEMS = [
        {
            key: '1',
            label: <Link href="/">Manage account</Link>,
        },
        {
            key: '2',
            label: (
                <p className="font-medium text-rose-600" onClick={handleLogout}>
                    Logout
                </p>
            ),
        },
    ];

    return (
        <nav className="flex h-14 w-full items-center justify-between border-b bg-white px-4 shadow-sm">
            <p className="text-xl font-semibold">Admin Manager</p>
            <div>
                <Dropdown
                    menu={{
                        items: MENU_ITEMS,
                    }}
                >
                    <Button shape="circle" icon={<UserOutlined />}></Button>
                </Dropdown>
            </div>
        </nav>
    );
};

export default Navbar;
