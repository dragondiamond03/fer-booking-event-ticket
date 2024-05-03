import React, { useEffect, useState, useRef, useMemo } from 'react';
import { BellOutlined } from '@ant-design/icons';
import { useQuery } from 'common/hooks/useQuery';
import { useAuth } from 'common/hooks/useAuth';
import { ONE_MINUTE } from 'common/constant/constant';
import NotificationItem from './notification-item';
import Link from 'next/link';

const Notification = () => {
    const auth = useAuth('client');

    const { data, reload } = useQuery(
        `notifications?user_id=${auth?.id}&status=NEW`,
        { user_id: auth?.id }
    );

    const notificationRef = useRef(null);

    const [isShowListNotification, setIsShowListNotification] = useState(false);

    useEffect(() => {
        //Fetch notification api 1 time per 1 minute
        const interval = setInterval(() => {
            reload();
        }, ONE_MINUTE);

        return () => clearInterval(interval);
    }, []);

    const notificationData = useMemo(() => {
        return data?.sort(
            (a, b) =>
                new Date(b.create_at).getTime() -
                new Date(a.create_at).getTime()
        );
    }, [data]);

    const handleClickOutSide = (e) => {
        if (!notificationRef.current?.contains(e.target)) {
            setIsShowListNotification(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutSide);

        return () => {
            document.removeEventListener('click', handleClickOutSide);
        };
    }, [notificationRef]);

    return (
        <div
            className="relative flex items-center justify-center"
            ref={notificationRef}
        >
            <div
                className="cursor-pointer"
                onClick={() => setIsShowListNotification((prev) => !prev)}
            >
                <BellOutlined className="text-xl text-slate-500" />
                {data?.length > 0 && (
                    <div className="absolute right-0 top-1 h-[6px] w-[6px] rounded-full bg-rose-600 text-7xl text-red-600" />
                )}
            </div>
            {isShowListNotification && (
                <div className="absolute right-0 top-12 z-30 flex max-h-[60vh] w-[360px] flex-col overflow-auto rounded-lg border border-[#d3dbd9] bg-white shadow-[0px_3px_6px_#11111126]">
                    <div className="p-3">
                        <h2 className="text-xl font-bold text-slate-600">
                            Notifications
                        </h2>
                    </div>
                    <div>
                        {data?.length === 0 ? (
                            <div className="p-3 text-center font-semibold text-slate-400">
                                There are no new notifications!
                            </div>
                        ) : (
                            notificationData?.map((item) => (
                                <NotificationItem
                                    key={item?.id}
                                    data={item}
                                    onClose={() =>
                                        setIsShowListNotification(false)
                                    }
                                    onReload={reload}
                                />
                            ))
                        )}
                    </div>
                    <div className="border-t py-2 text-center">
                        <Link
                            href="/my-page/notification-box"
                            className="text-sm text-blue-600"
                        >
                            View all
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notification;
