import React, { useRef, useCallback, useState, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import Heading from '../Heading';
import Modal from './modal';
import * as request from 'common/lib/httpRequest';
import { toast } from 'react-toastify';
import bcrypt from 'bcryptjs';
import useLoginModal from '~/hooks/useLoginModal';
import useRegisterModal from '~/hooks/useRegisterModal';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const LoginModal = () => {
    const router = useRouter();

    const formRef = useRef(null);

    const { isOpen, onClose } = useLoginModal();
    const { onOpen } = useRegisterModal();

    const [loading, setLoading] = useState(false);

    const toggle = useCallback(() => {
        onClose();
        onOpen();
    }, [onClose, onOpen]);

    const onFinish = (values) => {
        setLoading(true);
        request
            .get(`users?username=${values?.username}`)
            .then(async (data) => {
                if (!data?.data?.[0]) {
                    toast.error('Wrong username or password!');
                }
                if (data?.data?.[0]) {
                    const isCorrectPassword = await bcrypt.compareSync(
                        values?.password,
                        data?.data?.[0]?.password
                    );
                    const user = { ...data?.data?.[0], avatar: '' };
                    if (isCorrectPassword) {
                        Cookies.set('accessTokenClient', JSON.stringify(user), {
                            expires: 7,
                        });
                        toast.success('Login successfully!');
                        onClose();
                        setTimeout(() => {
                            router.reload();
                        }, 200);
                    } else {
                        toast.error('Wrong username or password!');
                    }
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onSubmit = () => {
        formRef.current?.submit();
    };

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                center
                subtitle="Login to your account!"
                title="Welcome to back"
            />
            <Form
                onFinish={onFinish}
                ref={formRef}
                layout="vertical"
                disabled={loading}
                className="no-scrollbar overflow-auto"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input size="large" />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password size="large" />
                </Form.Item>

                <Form.Item hidden>
                    <Button htmlType="submit" />
                </Form.Item>
            </Form>
        </div>
    );

    const footerContent = (
        <div className="mt-3 flex flex-col gap-4">
            <hr />

            <div className="mt-4 text-center font-light text-neutral-500">
                <div className="flex items-center justify-center gap-2">
                    <div>First time using TicketBox?</div>
                    <div
                        className="cursor-pointer text-neutral-800 hover:underline"
                        onClick={toggle}
                        role="presentation"
                    >
                        Create an account
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal
            actionLabel="Submit"
            body={bodyContent}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onSubmit}
            title="Login"
            disabled={loading}
            footer={footerContent}
        />
    );
};

export default LoginModal;
