import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal, Form, Input, Spin, Radio } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { useMutation } from 'common/hooks/useMutation';
import { toast } from 'react-toastify';
import { useQuery } from 'common/hooks/useQuery';
import bcrypt from 'bcryptjs';

const AdminForm = ({ adminId, successCallback, label, title }) => {
    const formRef = useRef(null);
    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        isLoading: getLoading,
        data: adminData,
        reload,
    } = useQuery(`admin/${adminId}`, { adminId, isModalOpen });
    const [trigger, { isLoading, data }] = useMutation();

    useEffect(() => {
        if (isModalOpen) {
            reload();
        }
    }, [isModalOpen]);

    useEffect(() => {
        if (adminData) {
            const { password, ...values } = adminData;
            form.setFieldsValue(values);
        }
    }, [adminData]);

    useEffect(() => {
        if (data) {
            adminId
                ? toast.success('Edit account admin successfully!')
                : toast.success('Created account admin successfully!');
            setIsModalOpen(false);
            setTimeout(() => {
                successCallback?.();
            });
        }
    }, [data]);

    const showModal = () => {
        form.resetFields();
        setIsModalOpen(true);
    };

    const handleOk = () => {
        formRef.current?.submit();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = async (values) => {
        const { confirmPassword, ...formValues } = values;
        const hashPassword = (
            await bcrypt.hash(values.password, 10)
        ).toString();
        console.log(hashPassword, 'hashPassword');
        const formSubmit = {
            ...formValues,
            role: 'ADMIN',
            password: hashPassword,
        };

        if (adminId) {
            trigger('PUT', `admin/${adminId}`, formSubmit);
        } else {
            trigger('POST', 'admin', formSubmit);
        }
    };

    return (
        <>
            <Button
                type="primary"
                icon={adminId ? <EditOutlined /> : <PlusOutlined />}
                onClick={showModal}
                shape={adminId ? 'circle' : 'default'}
            >
                {label}
            </Button>
            <Modal
                title={title}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{ loading: isLoading || getLoading }}
                cancelButtonProps={{ disabled: isLoading || getLoading }}
                centered
            >
                <Spin spinning={getLoading}>
                    <Form
                        layout="vertical"
                        ref={formRef}
                        onFinish={onFinish}
                        autoComplete="off"
                        disabled={isLoading}
                        form={form}
                    >
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
                            label="User name"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input user name!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input password!',
                                },
                            ]}
                        >
                            <Input.Password placeholder="Input password" />
                        </Form.Item>

                        <Form.Item
                            label="Confirm Password"
                            name="confirmPassword"
                            dependencies={['password']}
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
                                                'The two passwords that you entered do not match!'
                                            )
                                        );
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder="Confirm password" />
                        </Form.Item>
                        <Form.Item hidden>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>
        </>
    );
};

export default AdminForm;
