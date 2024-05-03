import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import {
    FacebookIcon,
    FacebookMessengerIcon,
    FacebookMessengerShareButton,
    FacebookShareButton,
    TelegramIcon,
    TelegramShareButton,
} from 'next-share';

export const AlertShare = ({
    children,
    type,
    icon,
    shape,
    modalTitle,
    message,
    linkShare,
    onCancel,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        onCancel?.();
        setIsModalOpen(false);
    };
    return (
        <>
            <Button type={type} shape={shape} onClick={showModal} icon={icon}>
                {children}
            </Button>
            <Modal
                title={modalTitle}
                open={isModalOpen}
                footer={false}
                onCancel={handleCancel}
                closable={false}
                centered
            >
                <p className="text-center text-xl">{message}</p>
                <div className="mt-4 flex w-full flex-col justify-center">
                    <div className="mt-2 flex w-full items-center justify-center gap-5">
                        <FacebookShareButton url={linkShare}>
                            <FacebookIcon size={32} round />
                        </FacebookShareButton>

                        {/* <FacebookMessengerShareButton
                            url={linkShare}
                            appId={''}
                        >
                            <FacebookMessengerIcon size={32} round />
                        </FacebookMessengerShareButton>

                        <TelegramShareButton
                            url={linkShare}
                            title={
                                'next-share is a social share buttons for your next React apps.'
                            }
                        >
                            <TelegramIcon size={32} round />
                        </TelegramShareButton> */}
                    </div>
                    <div className="border-box m-auto mt-4 flex w-full items-center rounded-md px-4 py-3">
                        <span className="product-link-share text-primary-gray text-base">
                            {linkShare}
                        </span>
                    </div>
                </div>
            </Modal>
        </>
    );
};
