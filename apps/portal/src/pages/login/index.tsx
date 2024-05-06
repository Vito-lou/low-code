import React, { useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { useStore } from '@/hooks';
import { useNavigate } from 'react-router-dom';
import { TUser } from '@/types';

function login() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const store = useStore();
    const onFinish: FormProps<TUser>['onFinish'] = (values) => {
        setLoading(true)
        store?.userStore.login(values).then(() => {
            navigate('/', { replace: true })
            // this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        })
        console.log('Success:', values, store);
    };

    const onFinishFailed: FormProps<TUser>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (<Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item<TUser>
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item<TUser>
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item<TUser>
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
        >
            <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
                Submit
            </Button>
        </Form.Item>
    </Form>)
}

export default login