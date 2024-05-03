import React, { useEffect, useMemo, useRef, useState } from 'react';
import Modal from './modal';
import { useAuth } from 'common/hooks/useAuth';
import { useQuery } from 'common/hooks/useQuery';
import { Form, Input, Spin } from 'antd';
import Image from 'next/image';
import { CameraFilled } from '@ant-design/icons';
import { convertImageToBase64 } from 'common/lib/base64';
import { useMutation } from 'common/hooks/useMutation';
import { toast } from 'react-toastify';

const UserProfileModal = ({ onClose, isOpen, successCallback }) => {
    const [form] = Form.useForm();

    const auth = useAuth('client');

    const { data, isLoading } = useQuery(`users?id=${auth?.id}`, {
        id: auth?.id,
    });

    const [trigger, { data: triggerData, isLoading: triggerLoading }] =
        useMutation();

    const inputAvatarRef = useRef(null);

    const [image, setImage] = useState();

    useEffect(() => {
        if (triggerData) {
            toast.success('Edit profile successfully!');
            setTimeout(() => {
                onClose?.();
                successCallback?.();
            }, 500);
        }
    }, [triggerData]);

    const user = useMemo(() => {
        return data?.[0];
    }, [data]);

    useEffect(() => {
        setImage(user?.avatar);
        form.setFieldsValue(user);
    }, [user]);

    const onFinish = (values) => {
        const submitObject = {
            ...values,
            avatar: image || '',
        };

        trigger('PATCH', `users/${auth?.id}`, submitObject);
    };

    const bodyContent = (
        <Spin spinning={isLoading}>
            <div className="flex gap-4">
                <div className="flex w-32 items-center justify-center">
                    <input
                        ref={inputAvatarRef}
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        hidden
                        onChange={async (e) => {
                            const file = await convertImageToBase64(
                                e.target.files?.[0]
                            );
                            setImage(file);
                            e.target.value = null;
                        }}
                    />

                    <div
                        className="relative h-[95px] w-[95px] cursor-pointer select-none"
                        onClick={() => {
                            inputAvatarRef.current?.click();
                        }}
                    >
                        <Image
                            src={image || '/images/placeholder.jpg'}
                            width={76}
                            height={76}
                            alt="avatar"
                            className="rounded-full object-cover"
                            style={{
                                width: 95,
                                height: 95,
                            }}
                        />
                        <div className="absolute bottom-0 right-0 flex h-[32px] w-[32px] items-center justify-center rounded-full border bg-white text-lg text-slate-400">
                            <CameraFilled />
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <Form layout="vertical" form={form} onFinish={onFinish}>
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Phone number"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your phone number!',
                                },
                                {
                                    pattern:
                                        /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
                                    message:
                                        'Please enter a valid phone number!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item hidden>
                            <button type="submit" />
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Spin>
    );

    return (
        <Modal
            actionLabel="Submit"
            body={bodyContent}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={() => {
                form.submit();
            }}
            title="Your Profile"
            disabled={triggerLoading || isLoading}
        />
    );
};

export default UserProfileModal;
