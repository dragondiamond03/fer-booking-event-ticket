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
import { useVnApi } from 'common/hooks/vn-api';
import { useQuery } from 'common/hooks/useQuery';

import { UploadOutlined } from '@ant-design/icons';
import { getProvince, getDistrict } from 'common/lib/getAddress';
import Image from 'next/image';
import { convertImageToBase64 } from 'common/lib/base64';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const EventForm = ({ initialValue, action, isLoading }) => {
    const [form] = Form.useForm();

    const { data } = useQuery('eventType?isShow=1');

    const [provinceSelected, setProvinceSelected] = useState();
    const [districtSelected, setDistrictSelected] = useState();
    const [image, setImage] = useState();

    const { provinces, districts, wards } = useVnApi(
        provinceSelected,
        districtSelected
    );

    useEffect(() => {
        if (initialValue) {
            form.setFieldsValue({
                ...initialValue,
                eventTime: initialValue?.eventTime?.map((item) => dayjs(item)),
            });
            setProvinceSelected(getProvince(initialValue?.provinceId)?.code);
            setDistrictSelected(getDistrict(initialValue?.districtId)?.code);
            setImage(initialValue?.image);
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
                    label="Event name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input event name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="bigEvent" valuePropName="checked">
                    <Checkbox>This is outstanding event.</Checkbox>
                </Form.Item>
                <div className="flex gap-5">
                    <Form.Item
                        className="w-40"
                        label="Event type"
                        name="eventTypeId"
                        rules={[
                            {
                                required: true,
                                message: 'Please input event type!',
                            },
                        ]}
                    >
                        <Select>
                            {data?.map((item) => (
                                <Select.Option key={item?.id} value={item?.id}>
                                    {item?.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="eventTime"
                        label="Event time"
                        rules={[
                            {
                                type: 'array',
                                required: true,
                                message: 'Please select event time!',
                            },
                        ]}
                    >
                        <RangePicker showTime format="YYYY-MM-DD HH:mm" />
                    </Form.Item>
                </div>
                <div className="flex gap-5">
                    <Form.Item
                        className="w-40"
                        label="Province"
                        name="provinceId"
                        rules={[
                            {
                                required: true,
                                message: 'Please input event province!',
                            },
                        ]}
                    >
                        <Select
                            onChange={(value) => {
                                const selectedObject = provinces?.find(
                                    (item) => item._id === value
                                );
                                setProvinceSelected(selectedObject?.code);
                                form.setFieldsValue({
                                    district: '',
                                    ward: '',
                                });
                            }}
                        >
                            {provinces?.map((item) => (
                                <Select.Option
                                    key={item?._id}
                                    value={item?._id}
                                >
                                    {item?.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="District"
                        name="districtId"
                        className="w-40"
                        rules={[
                            {
                                required: true,
                                message: 'Please input event district!',
                            },
                        ]}
                    >
                        <Select
                            onChange={(value) => {
                                const selectedObject = districts?.find(
                                    (item) => item._id === value
                                );
                                setDistrictSelected(selectedObject?.code);
                                form.setFieldsValue({
                                    ward: '',
                                });
                            }}
                        >
                            {districts?.map((item) => (
                                <Select.Option
                                    key={item?._id}
                                    value={item?._id}
                                >
                                    {item?.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Ward"
                        name="wardId"
                        className="w-40"
                        rules={[
                            {
                                required: true,
                                message: 'Please input event ward!',
                            },
                        ]}
                    >
                        <Select>
                            {wards?.map((item) => (
                                <Select.Option
                                    key={item?._id}
                                    value={item?._id}
                                >
                                    {item?.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>
                <Form.Item
                    label="Street"
                    name="street"
                    rules={[
                        {
                            required: true,
                            message: 'Please input event specific address!',
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
                        name="image"
                        label="Image"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={[
                            {
                                required: true,
                                message: 'Please input banner image!',
                            },
                        ]}
                    >
                        <Upload
                            name="logo"
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

                <Form.Item>
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

export default EventForm;
