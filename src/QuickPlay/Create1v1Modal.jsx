import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, Select} from 'antd';
import { addAQuickPlay } from '../Actions/QuickPlay';


const Create1v1Modal = (props) => {
const { Option } = Select;
const [value, setValue] = useState(0);

const onChange = (newValue) => {
    if (newValue !== undefined && newValue.toString().split('.')[1]?.length > 2) {
        const roundedValue = Math.ceil(newValue * 100) / 100;
        console.log('changed', roundedValue);
        setValue(roundedValue);
    } else {
        console.log('changed', newValue);
        setValue(newValue);
    }
};
const handleCreateButtonClick= () =>{
    let data = {
        host:props.currentUser,
        title: 'Himmer 1v1 0192837',
        bid: value
    }
    addAQuickPlay(data)
        props.setIs1v1ModalOpen(false)
}
const selectBefore = (
  <Select defaultValue="add" style={{ width: 60 }}>
    <Option value="add">+</Option>
    <Option value="minus">-</Option>
  </Select>
);

  return (
    <Modal title="Create 1v1 Match" open={props.is1v1ModalOpen} onOk={handleCreateButtonClick } onCancel={() => console.log('Match creation cancelled.')}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span>What do you want to bid on this 1 v 1?</span>
          <InputNumber style={{ marginTop: '8px', width: 'calc(40% - 40px)' }} onChange={onChange} value={value} />    
        </div>
    </Modal>
  );
}

export default Create1v1Modal