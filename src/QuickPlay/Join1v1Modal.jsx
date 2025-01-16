import React, { useState } from 'react';
import { Modal, Select} from 'antd';



const Join1v1Modal = (props) => {
const { Option } = Select;
const [value, setValue] = useState(0);



  return (
    <Modal title={`1v1 ${props.currentPossible1v1Match.summonerName}?`} open={props.isJoin1v1ModalOpen}  onCancel={() => props.setIsJoin1v1ModalOpen(false)}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span>Do you want to add ${props.currentPossible1v1Match.bid} to the pot to 1 v 1  
             <a href={`https://www.op.gg/summoners/na/${props.currentPossible1v1Match.summonerName}-NA1`} target="_blank" rel="noopener noreferrer"> {props.currentPossible1v1Match.summonerName}</a>
            </span>
        </div>
    </Modal>
  );
}

export default Join1v1Modal