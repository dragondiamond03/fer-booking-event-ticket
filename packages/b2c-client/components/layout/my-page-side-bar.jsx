import React from 'react';
import Link from 'next/link';

const NavLink = ({ href, children }) => {
    return (
        <Link href={href} className="text-slate-600 hover:text-slate-600">
            {children}
        </Link>
    );
};

const SidebarItem = ({ children, href }) => {
    return (
        <div>
            <Link
                href={href}
                className=" group text-slate-500 hover:text-rose-400"
            >
                <div className="h-full w-full border-b-2 py-6 font-medium">
                    {children}
                </div>
            </Link>
        </div>
    );
};

const MyPageSideBar = () => {
    return (
        <nav className="min-w-[240px]">
            <header className="border-b-2 border-b-black pb-4 text-2xl font-bold">
                <NavLink href="/my-page">My Page</NavLink>
            </header>
            <SidebarItem href="/my-page/booking-detail">
                Booking detail
            </SidebarItem>
            <SidebarItem href="/my-page/notification-box">
                Notification
            </SidebarItem>
        </nav>
    );
};

export default MyPageSideBar;
