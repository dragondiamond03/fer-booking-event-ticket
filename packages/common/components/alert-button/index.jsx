import React, { useState } from 'react';
import { Button, Modal } from 'antd';

export const AlertButton = ({
    children,
    type,
    icon,
    message,
    shape,
    danger,
    modalTitle,
    onConfirm,
    onCancel,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        onConfirm?.();
        setTimeout(() => {
            setIsModalOpen(false);
        }, 500);
    };
    const handleCancel = () => {
        onCancel?.();
        setIsModalOpen(false);
    };
    return (
        <>
            <Button
                type={type}
                danger={danger ? true : false}
                shape={shape}
                onClick={showModal}
                icon={icon}
            >
                {children}
            </Button>
            <Modal
                title={modalTitle}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                closable={false}
                okText="Confirm"
                centered
            >
                <p className="text-center">{message}</p>
            </Modal>
        </>
    );
};
