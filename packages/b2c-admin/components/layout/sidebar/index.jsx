import React, { useEffect, useState } from 'react';
import {
    CalendarOutlined,
    AreaChartOutlined,
    ContainerOutlined,
    CheckSquareOutlined,
    UserOutlined,
    SolutionOutlined,
    CommentOutlined,
} from '@ant-design/icons';

import { Menu } from 'antd';
import { getWindowDimensions } from 'common/lib/getWindowDimensions';
import Link from 'next/link';
import { cn } from 'common/lib/utils';
import { useRouter } from 'next/router';

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem('Events', '1', <CalendarOutlined />, [
        getItem(<Link href={'/'}>Manage events</Link>, '/'),
        getItem(<Link href={'/events/event-types'}>Event types</Link>, '/'),
    ]),
    getItem(
        'Tickets',
        '/tickets',
        <Link href={'/tickets'}>
            <ContainerOutlined />
        </Link>
    ),
    getItem(
        'Booking',
        '/booking',
        <Link href={'/booking'}>
            <CheckSquareOutlined />
        </Link>
    ),
    // getItem(
    //     'Users',
    //     '/users',
    //     <Link href={'/users'}>
    //         <UserOutlined />
    //     </Link>
    // ),
    getItem(
        'Reporting and Analysis',
        '/report',
        <Link href={'/report'}>
            <AreaChartOutlined />
        </Link>
    ),
    getItem(
        'Promotion ',
        '/promotion',
        <Link href={'/promotion'}>
            <SolutionOutlined />
        </Link>
    ),
    getItem(
        'Feedback',
        '/feedback',
        <Link href={'/feedback'}>
            <CommentOutlined />
        </Link>
    ),
];

const Sidebar = () => {
    const router = useRouter();
    const [current, setCurrent] = useState(router.pathname);
    useEffect(() => {
        setCurrent(router.pathname);
    }, [router.pathname]);

    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (windowDimensions.width <= 960) {
            setCollapsed(true);
        } else {
            setCollapsed(false);
        }
    }, [windowDimensions]);

    return (
        <div className={cn('shadow-sm', !collapsed ? 'w-60' : '')}>
            <Menu
                style={{
                    height: 'calc(100vh - 56px)',
                }}
                mode="inline"
                inlineCollapsed={collapsed}
                items={items}
                selectedKeys={false}
            />
        </div>
    );
};

export default Sidebar;
