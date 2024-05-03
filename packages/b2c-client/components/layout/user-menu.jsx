import React, { useState, useCallback, useEffect, useRef } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import MenuItem from './menu-item';
import useRegisterModal from '~/hooks/useRegisterModal';
import useLoginModal from '~/hooks/useLoginModal';
import { useAuth } from 'common/hooks/useAuth';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useQuery } from 'common/hooks/useQuery';
import Image from 'next/image';

const UserMenu = () => {
    const router = useRouter();

    const menuRef = useRef(null);

    const { onOpen: onOpenRegisterModal } = useRegisterModal();
    const { onOpen: onOpenLoginModal } = useLoginModal();

    const currentUser = useAuth('client');

    const { data: user } = useQuery(`users/${currentUser?.id}`, {
        id: currentUser?.id,
    });

    const [isOpen, setIsOpen] = useState(false);

    const handleClickOutSide = (e) => {
        if (!menuRef.current?.contains(e.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutSide);

        return () => {
            document.removeEventListener('click', handleClickOutSide);
        };
    }, [menuRef]);

    const toggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    const signOut = () => {
        Cookies.remove('accessTokenClient');
        setTimeout(() => {
            router.reload();
            setIsOpen(false);
        }, 200);
    };

    return (
        <div className="relative" ref={menuRef}>
            <div className="flex items-center gap-3">
                <div
                    className="flex cursor-pointer select-none items-center gap-3 rounded-full border-[1px] border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1"
                    onClick={toggleOpen}
                >
                    <MenuOutlined />
                    <div className="hidden md:block">
                        <Image
                            src={user?.avatar || '/images/placeholder.jpg'}
                            alt="avatar"
                            className="rounded-full object-cover"
                            width={30}
                            height={30}
                            style={{
                                width: 30,
                                height: 30,
                            }}
                        />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="absolute right-0 top-12 z-50 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-[225px]">
                    <div className="flex cursor-pointer flex-col">
                        {currentUser ? (
                            <>
                                <MenuItem
                                    label="Manage your profile"
                                    onClick={() => {
                                        router.push('/my-page');
                                        setIsOpen(false);
                                    }}
                                />
                                <MenuItem
                                    className="text-rose-500"
                                    label="Logout"
                                    onClick={signOut}
                                />
                            </>
                        ) : (
                            <>
                                <MenuItem
                                    label="Login"
                                    onClick={() => {
                                        onOpenLoginModal();
                                        setIsOpen(false);
                                    }}
                                />
                                <MenuItem
                                    label="Sign up"
                                    onClick={() => {
                                        onOpenRegisterModal();
                                        setIsOpen(false);
                                    }}
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
