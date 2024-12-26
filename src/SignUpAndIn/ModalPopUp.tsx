import React from 'react';
import { Modal } from 'antd';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';


interface ModalPopUpProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  modalState: Number;
}

const ModalPopUp: React.FC<ModalPopUpProps> = ({ isModalOpen, setIsModalOpen, modalState }) => {
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
  
    return (
      <>
        <Modal 
            title={<div style={{ textAlign: 'center', marginBottom: '3em' }}>{modalState === 0 ? "Login" : "Sign Up"}</div>} 
            open={isModalOpen} 
            onOk={handleOk} 
            onCancel={handleCancel}
            footer={null}
            >
            {modalState === 0 ? <LoginModal setIsModalOpen={setIsModalOpen}  /> : <SignUpModal setIsModalOpen={setIsModalOpen} />}
        </Modal>
      </>
    );
};

export default ModalPopUp;
