import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    Button,
    Select,
    Upload,
    DatePicker,
    InputNumber,
    Checkbox,
} from 'antd';
import { useQuery } from 'common/hooks/useQuery';

import { UploadOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { convertImageToBase64 } from 'common/lib/base64';

const PromotionForm = ({ initialValue, action, isLoading }) => {
    const {
        data: listEvent,
        reload: eventReload,
        isLoading: eventLoading,
    } = useQuery('events');

    const [form] = Form.useForm();

    const [image, setImage] = useState();

    useEffect(() => {
        if (initialValue) {
            form.setFieldsValue({
                ...initialValue,
            });
            setImage(initialValue?.thumbnail);
        }
    }, [initialValue]);

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    return (
        <div>
            <Form
                form={form}
                layout="vertical"
                autoComplete="off"
                onFinish={action}
                disabled={isLoading}
            >
                <Form.Item
                    label="Promotion title"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input promotion title!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Event"
                    name="eventId"
                    rules={[
                        {
                            required: true,
                            message: 'Please input event!',
                        },
                    ]}
                >
                    <Select>
                        {listEvent?.map((item) => (
                            <Select.Option key={item?.id} value={item?.id}>
                                {item?.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Event link"
                    name="linkEvent"
                    rules={[
                        {
                            required: true,
                            message: 'Please input event link!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Please input event description!',
                        },
                    ]}
                >
                    <Input.TextArea rows={5} />
                </Form.Item>

                <div className="flex gap-8">
                    <Form.Item
                        name="thumbnail"
                        label="Thumbnail"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={[
                            {
                                required: true,
                                message: 'Please input thumbnail!',
                            },
                        ]}
                    >
                        <Upload
                            name="image"
                            onChange={async (e) => {
                                setImage(
                                    e?.fileList?.[0]?.originFileObj
                                        ? [
                                              await convertImageToBase64(
                                                  e?.fileList?.[0]
                                                      ?.originFileObj
                                              ),
                                          ]
                                        : null
                                );
                            }}
                        >
                            <Button
                                icon={<UploadOutlined />}
                                disabled={image ? true : false}
                            >
                                Click to upload
                            </Button>
                        </Upload>
                    </Form.Item>
                    <div>
                        {image?.[0] && (
                            <Image
                                className="rounded-lg"
                                src={image?.[0]}
                                width={240}
                                height={240}
                                alt=""
                            />
                        )}
                    </div>
                </div>

                <Form.Item className="mt-4">
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isLoading}
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default PromotionForm;
