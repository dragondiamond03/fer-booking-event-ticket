import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal, Form, Input, Spin, Radio } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { useMutation } from 'common/hooks/useMutation';
import { toast } from 'react-toastify';
import { useQuery } from 'common/hooks/useQuery';

const EventTypeForm = ({ typeId, successCallback, label, title }) => {
    const formRef = useRef(null);
    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        isLoading: getLoading,
        data: eventTypeData,
        reload,
    } = useQuery(`eventType/${typeId}`, { typeId, isModalOpen });
    const [trigger, { isLoading, data }] = useMutation();

    useEffect(() => {
        if (isModalOpen) {
            reload();
        }
    }, [isModalOpen]);

    useEffect(() => {
        form.setFieldsValue(eventTypeData);
    }, [eventTypeData]);

    useEffect(() => {
        if (data) {
            toast.success('Created event type successfully!');
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

    const onFinish = (values) => {
        if (typeId) {
            trigger('PUT', `eventType/${typeId}`, values);
        } else {
            trigger('POST', 'eventType', values);
        }
    };

    return (
        <>
            <Button
                type="primary"
                icon={typeId ? <EditOutlined /> : <PlusOutlined />}
                onClick={showModal}
                shape={typeId ? 'circle' : 'default'}
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
                            label="Event name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your event name!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item hidden>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                        <Form.Item
                            label="Show on select"
                            name="isShow"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Please select your show on select!',
                                },
                            ]}
                        >
                            <Radio.Group>
                                <Radio value="1"> Show </Radio>
                                <Radio value="0"> Hide </Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>
        </>
    );
};

export default EventTypeForm;
