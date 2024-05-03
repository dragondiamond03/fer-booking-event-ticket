import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Button, Modal, Form, Input, Spin, Select, Descriptions } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useMutation } from 'common/hooks/useMutation';
import { toast } from 'react-toastify';
import { useQuery } from 'common/hooks/useQuery';
import { STATUS_BOOKING } from 'common/constant/constant';
import { currencyFormatter } from 'common/lib/utils';
import dayjs from 'dayjs';

const BookingForm = ({
    bookingId,
    successCallback,
    label,
    title,
    dataSource,
}) => {
    const formRef = useRef(null);
    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        isLoading: getLoading,
        data: bookingData,
        reload,
    } = useQuery(`booking/${bookingId}`, { bookingId, isModalOpen });

    const [trigger, { isLoading, data }] = useMutation();
    const [triggerNoti, { isLoading: isLoadingNoti, data: dataNoti }] =
        useMutation();

    const dataTicket = useMemo(() => {
        return dataSource?.find((item) => item.key == bookingId);
    }, [bookingId]);

    useEffect(() => {
        if (isModalOpen) {
            reload();
        }
    }, [isModalOpen]);

    useEffect(() => {
        form.setFieldsValue(bookingData);
    }, [bookingData]);

    useEffect(() => {
        if (data && dataNoti) {
            toast.success('Update booking successfully!');
            setIsModalOpen(false);
            setTimeout(() => {
                successCallback?.();
            });
        }
    }, [data, dataNoti]);

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
        if (bookingId && dataSource) {
            const notiValue = {
                booking_id: bookingId,
                status: 'NEW',
                user_id: dataTicket.user_id,
                content: values?.content || '',
                ticket_id: dataTicket?.ticketId,
                create_at: dayjs().format('DD/MM/YYYY HH:mm:ss'),
            };
            triggerNoti('POST', 'notifications', notiValue);
            trigger('PUT', `booking/${bookingId}`, values);
        }
    };

    return (
        <>
            <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={showModal}
                shape={'circle'}
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
                width={600}
            >
                <Spin spinning={getLoading}>
                    <Descriptions title="Ticket Info">
                        <Descriptions.Item label="Id">
                            {dataTicket?.key}
                        </Descriptions.Item>
                        <Descriptions.Item label="User name">
                            {dataTicket.userName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ticket name">
                            {dataTicket.ticketName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Price">
                            {currencyFormatter(dataTicket.price)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Even name">
                            {dataTicket.eventName}
                        </Descriptions.Item>
                    </Descriptions>
                    <Form
                        layout="vertical"
                        ref={formRef}
                        onFinish={onFinish}
                        autoComplete="off"
                        disabled={isLoading}
                        form={form}
                    >
                        <Form.Item
                            label="event id"
                            name="event_id"
                            className="hidden"
                        >
                            <Input disabled={true} />
                        </Form.Item>
                        <Form.Item
                            label="ticket_id"
                            name="ticket_id"
                            className="hidden"
                        >
                            <Input disabled={true} />
                        </Form.Item>
                        <Form.Item
                            label="user_id"
                            name="user_id"
                            className="hidden"
                        >
                            <Input disabled={true} />
                        </Form.Item>
                        <Form.Item
                            label="Booking id"
                            name="id"
                            className="hidden"
                        >
                            <Input disabled={true} />
                        </Form.Item>
                        <Form.Item
                            label="createAt"
                            name="createAt"
                            className="hidden"
                        >
                            <Input disabled={true} />
                        </Form.Item>

                        <Form.Item
                            className="w-40"
                            label="Booking status"
                            name="status"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input booking status!',
                                },
                            ]}
                        >
                            <Select>
                                {STATUS_BOOKING?.map((item) => (
                                    <Select.Option key={item} value={item}>
                                        {item}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item label="Note" name="content">
                            <Input.TextArea rows={4} />
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

export default BookingForm;
