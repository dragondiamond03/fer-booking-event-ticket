import Image from 'next/image';
import React, { useMemo, useState } from 'react';
import { CameraFilled } from '@ant-design/icons';
import { useAuth } from 'common/hooks/useAuth';
import { useQuery } from 'common/hooks/useQuery';
import { Spin } from 'antd';
import UserProfileModal from '../modals/user-profile-modal';
import ChangePasswordModal from '../modals/change-password-modal';

const UserProfile = () => {
    const auth = useAuth('client');

    const { data, isLoading, reload } = useQuery(`users?id=${auth?.id}`, {
        id: auth?.id,
    });

    const { data: bookingData, isLoading: bookingLoading } = useQuery(
        `booking?user_id=${auth?.id}`,
        { user_id: auth?.id }
    );

    const [editProfileModal, setEditProfileModal] = useState(false);
    const [showChangePassModal, setShowChangePassModal] = useState(false);

    const user = useMemo(() => {
        return data?.[0];
    }, [data]);

    const booking = useMemo(() => {
        const approved = bookingData?.filter(
            (item) => item?.status === 'APPROVED'
        );
        const pending = bookingData?.filter(
            (item) => item?.status === 'PENDING'
        );
        const reject = bookingData?.filter((item) => item?.status === 'REJECT');
        return {
            approved,
            pending,
            reject,
        };
    }, [bookingData]);

    return (
        <>
            <Spin spinning={isLoading}>
                <div className="rounded-lg p-10 shadow-[0_0_6px_rgba(0,0,0,0.149)]">
                    <div className="flex gap-6">
                        <div>
                            <div
                                className="flex cursor-pointer gap-6"
                                onClick={() => {
                                    setEditProfileModal(true);
                                }}
                            >
                                <div>
                                    <div className="relative">
                                        <Image
                                            src={
                                                user?.avatar ||
                                                '/images/placeholder.jpg'
                                            }
                                            width={76}
                                            height={76}
                                            alt="avatar"
                                            className="rounded-full object-cover"
                                            style={{
                                                width: 76,
                                                height: 76,
                                            }}
                                        />
                                        <div className="absolute bottom-0 right-0 flex h-[32px] w-[32px] items-center justify-center rounded-full border bg-white text-lg text-slate-400">
                                            <CameraFilled />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="text-xl font-semibold">
                                        {user?.name}
                                    </div>
                                    <div>
                                        <div>{user?.email}</div>
                                        <div>{user?.phone}</div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="cursor-pointer text-sm underline"
                                onClick={() => setShowChangePassModal(true)}
                            >
                                Change password
                            </div>
                        </div>
                        <div className="flex flex-1 px-8 font-medium">
                            <div className="flex flex-1 flex-col items-center justify-center gap-2 text-green-600">
                                <p>Ticket approved</p>
                                <p>{booking?.approved?.length || 0}</p>
                            </div>
                            <div className="flex flex-1 flex-col items-center justify-center gap-2 border-x text-yellow-600">
                                <p>Ticket pending</p>
                                <p>{booking?.pending?.length || 0}</p>
                            </div>
                            <div className="flex flex-1 flex-col items-center justify-center gap-2 text-rose-600">
                                <p>Ticket rejected</p>
                                <p>{booking?.reject?.length || 0}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Spin>
            <>
                {editProfileModal && (
                    <UserProfileModal
                        isOpen={editProfileModal}
                        onClose={() => {
                            setEditProfileModal(false);
                        }}
                        successCallback={() => {
                            reload();
                        }}
                    />
                )}
                {showChangePassModal && (
                    <ChangePasswordModal
                        isOpen={showChangePassModal}
                        onClose={() => {
                            setShowChangePassModal(false);
                        }}
                    />
                )}
            </>
        </>
    );
};

export default UserProfile;
