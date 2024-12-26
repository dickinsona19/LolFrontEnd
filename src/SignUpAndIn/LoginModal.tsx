import React from 'react';
import { Form, Input, Button, Space, notification } from 'antd';
import { useCurrentUser } from '../Context/CurrentUserContext';
import {forgotPassword} from '../Actions/Users.js';
// Removed useToast import as per instructions

interface LoginModalProps {
    setIsModalOpen: (value: boolean) => void;

  }
const LoginModal: React.FC<LoginModalProps> = ({setIsModalOpen}) => {  // Specify the type for handleOk
  const { login } = useCurrentUser();
    const [forgotPasswordModal, setForgotPasswordModal] = React.useState(false);
 
    const onFinish = async (values: { email: string; password: string }) => {
      console.log('Success:', values);
      
      // Ensure `values` contains both username and password
      const success = await login(values);
    
      if (success) {
        console.log('Login successful:');
        setIsModalOpen(false); // Close modal only on success
      } else {
        console.error('Login failed:'); // Handle login failure (e.g., show notification)
      }
    };
  const handleForgotPasswordClick = async () => {

    setForgotPasswordModal(true)
     
  };

  const onForgotPasswordFinish = async (value: any) =>{
    try {
      setIsModalOpen(false);
      setForgotPasswordModal(false)
      await forgotPassword(value.email);
      notification.success({
        message: "Password Reset Email Sent",
        description: "Please check your email for the password reset token.",
      })
    } catch (error) {
      console.error('Error sending password reset link:', error);
      notification.error({
        message: "Failed to Send Password Reset Email",
        description: "Please try again.",
      });
    }
  }

  

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
        {forgotPasswordModal ===false ?
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 10 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}  // Pass onFinish here
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item wrapperCol={{ offset: 6, span: 13 }}
        name="email"
        rules={[{ required: true, message: 'Please input your Email!' }]}
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 13 }}>

      <Form.Item 
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password placeholder="Password" />
       
      </Form.Item>
      <a onClick={handleForgotPasswordClick} style={{ textAlign: 'center', display: 'block' }}>Forgot Password?</a>
   
      </Form.Item>
      
      
      <Form.Item wrapperCol={{ offset: 11, span: 14 }}>
        <Button type="primary" htmlType="submit">  
          Login
        </Button>
        
      </Form.Item>
    </Form>
    :


    <Form
       name="basic"
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 10 }}
      initialValues={{ remember: true }}
      onFinish={onForgotPasswordFinish}  // Pass onFinish here
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item wrapperCol={{ offset: 6, span: 13 }}
        name="email"
        rules={[{ required: true, message: 'Please input your Email!' }]}
      >
        <Input placeholder="Email" />
      </Form.Item>


      <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
        <Button type="primary" htmlType="submit">  
          Send Email
        </Button>
        
      </Form.Item>

    </Form>
    
    
    }
    
    
    </>

  );
}

export default LoginModal;
