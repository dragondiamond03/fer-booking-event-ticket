import React, { useEffect, useRef } from 'react';
import Modal from './modal';
import { Button, Form, Input } from 'antd';
import { useAuth } from 'common/hooks/useAuth';
import { useQuery } from 'common/hooks/useQuery';
import bcrypt from 'bcryptjs';
import { useMutation } from 'common/hooks/useMutation';
import { SALT } from 'common/constant/constant';
import { toast } from 'react-toastify';

const ChangePasswordModal = ({ isOpen, onClose }) => {
    const auth = useAuth('client');

    const { data: userData, isLoading: userIsLoading } = useQuery(
        `users/${auth?.id}`,
        { id: auth?.id }
    );
    const [trigger, { data, isLoading }] = useMutation();

    const formRef = useRef(null);

    useEffect(() => {
        if (data) {
            toast.success('Change password successfully!');
            setTimeout(() => {
                onClose?.();
            }, 500);
        }
    }, [data]);

    const onFinish = async (values) => {
        const submitObject = {
            password: await bcrypt.hashSync(values.password, SALT),
        };

        trigger('PATCH', `users/${auth?.id}`, submitObject);
    };

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Form
                onFinish={onFinish}
                ref={formRef}
                layout="vertical"
                className="no-scrollbar max-h-[40vh] overflow-auto"
                disabled={isLoading}
            >
                <Form.Item
                    label="Old Password"
                    name="oldPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your old password!',
                        },
                        () => ({
                            validator: async (_, value) => {
                                const isCorrectPassword =
                                    await bcrypt.compareSync(
                                        value,
                                        userData?.password
                                    );
                                if (isCorrectPassword) {
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

                <Form.Item hidden>
                    <Button htmlType="submit" />
                </Form.Item>
            </Form>
        </div>
    );
    return (
        <Modal
            actionLabel="Submit"
            body={bodyContent}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={() => {
                formRef.current?.submit();
            }}
            title="Change your password"
            disabled={isLoading}
        />
    );
};

export default ChangePasswordModal;
