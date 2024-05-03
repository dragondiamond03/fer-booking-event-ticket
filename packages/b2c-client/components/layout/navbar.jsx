import React from 'react';
import Container from '../container';
import UserMenu from './user-menu';
import Logo from './logo';
import Search from './search';
import Notification from './notification';
import { useAuth } from 'common/hooks/useAuth';

const Navbar = () => {
    const auth = useAuth('client');

    return (
        <div className="w-full bg-white shadow-sm">
            <div className="border-b-[1px] py-4">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                        <Logo />
                        <Search />
                        <div className="flex gap-6">
                            {auth && <Notification />}
                            <UserMenu />
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Navbar;
