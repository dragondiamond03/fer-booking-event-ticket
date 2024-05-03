import React, { useRef, useCallback, useState, useEffect } from 'react';
import useRegisterModal from '~/hooks/useRegisterModal';
import { Button, Form, Input } from 'antd';
import Heading from '../Heading';
import Modal from './modal';
import { useMutation } from 'common/hooks/useMutation';
import * as request from 'common/lib/httpRequest';
import { toast } from 'react-toastify';
import bcrypt from 'bcryptjs';
import { SALT } from 'common/constant/constant';
import useLoginModal from '~/hooks/useLoginModal';

const RegisterModal = () => {
    const [trigger, { isLoading, data }] = useMutation();

    const formRef = useRef(null);

    const { isOpen, onClose } = useRegisterModal();
    const { onOpen } = useLoginModal();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (data) {
            toast.success('Create an account successfully!');
            onClose();
        }
    }, [data]);

    const toggle = useCallback(() => {
        onClose();
        onOpen();
    }, [onClose, onOpen]);

    const onFinish = (values) => {
        const submitObj = {
            name: values.name,
            email: values.email,
            phone: values.phone,
            username: values.username,
            password: bcrypt.hashSync(values.password, SALT),
        };

        setLoading(true);
        request
            .get(`users?username=${values?.username}`)
            .then((data) => {
                if (data?.data?.[0]) {
                    toast.error('Account already exist!');
                } else {
                    trigger('POST', 'users', submitObj);
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
                subtitle="Create an account!"
                title="Welcome to TicketBox"
            />
            <Form
                onFinish={onFinish}
                ref={formRef}
                layout="vertical"
                disabled={isLoading || loading}
                className="no-scrollbar max-h-[40vh] overflow-auto"
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
                    hasFeedback
                >
                    <Input.Password size="large" />
                </Form.Item>
                <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue('password') === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(
                                        'The new password that you entered do not match!'
                                    )
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password size="large" />
                </Form.Item>
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
                    <Input size="large" />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                        {
                            type: 'email',
                            message: 'Please enter a valid email!',
                        },
                    ]}
                >
                    <Input size="large" />
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
                            message: 'Please enter a valid phone number!',
                        },
                    ]}
                >
                    <Input size="large" />
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
                    <div>Already have an account?</div>
                    <div
                        className="cursor-pointer text-neutral-800 hover:underline"
                        onClick={toggle}
                        role="presentation"
                    >
                        Login
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
            title="Register"
            disabled={isLoading || loading}
            footer={footerContent}
        />
    );
};

export default RegisterModal;
