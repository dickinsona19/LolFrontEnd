import React from 'react'
import { Form, Input, Button } from 'antd';
import { signUpUser } from '../Actions/Users';
import { useCurrentUser } from '../Context/CurrentUserContext';


interface SignUpModalProps {
    setIsModalOpen: (value: boolean) => void;
}


 const SignUpModal: React.FC<SignUpModalProps> = ({ setIsModalOpen}) => {
    const { login } = useCurrentUser();

    const onFinish = async (values: any) => {
        console.log('Success:', values);
    
        try {
          const response = await signUpUser(values);  // Call loginUser with form data (username and password)
          console.log('Login successful:', response);  // Handle success (e.g., set tokens, redirect, etc.)

          let success = await login({ email: values.email, password: values.password });
          setIsModalOpen(false);
        } catch (error) {
          console.error('Login failed:', error);  // Handle login errors (e.g., invalid credentials)
        }
      };
    
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
    return (
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 10 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          wrapperCol={{ offset: 6, span: 13 }}
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          wrapperCol={{ offset: 6, span: 13 }}
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          wrapperCol={{ offset: 6, span: 13 }}
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          wrapperCol={{ offset: 6, span: 13 }}
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    );
  }


export default SignUpModal
