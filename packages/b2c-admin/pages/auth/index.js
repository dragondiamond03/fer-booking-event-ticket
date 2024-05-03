import { Button, Form, Input } from 'antd';
import React from 'react';
import { loginAdmin } from 'common/services/auth';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
const Auth = () => {
    const router = useRouter();
    const onFinish = async (values) => {
        const resDataLogin = await loginAdmin(values);
        if (resDataLogin) {
            toast.success('Login successfully!');
            router.replace('/');
        } else {
            toast.error('Login failed!');
        }
    };

    return (
        <div className="flex h-[100vh] w-[100vw] items-center justify-center">
            <div className="w-[400px] rounded-xl border border-slate-200 p-6 shadow-lg">
                <h1 className="mb-5 text-center text-2xl font-bold uppercase">
                    Sign In
                </h1>
                <Form onFinish={onFinish} layout="vertical" autoComplete="off">
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
                        <Input />
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
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Sign in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Auth;

Auth.getLayout = function getLayout(page) {
    return page;
};
