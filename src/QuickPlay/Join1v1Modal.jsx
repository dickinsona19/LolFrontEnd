import React, { useState } from 'react';
import { Modal, Select} from 'antd';
import {join1v1QuickPlayGame} from '../Actions/QuickPlay'



const Join1v1Modal = (props) => {
  
  const handleOk = async () => {
    try {
      await join1v1QuickPlayGame(props.currentPossible1v1Match.id, props.currentUser.id);
      console.log('Game joined successfully');
    } catch (error) {
      console.error('Error joining game:', error);
    }
  }
  return (
    <Modal title={`1v1 ${props.currentPossible1v1Match.summonerName}?`} open={props.isJoin1v1ModalOpen}  onCancel={() => props.setIsJoin1v1ModalOpen(false)} onOk={()=>{handleOk()}}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span>Do you want to add ${props.currentPossible1v1Match.bid} to the pot to 1 v 1  
             <a href={`https://www.op.gg/summoners/na/${props.currentPossible1v1Match.summonerName}-NA1`} target="_blank" rel="noopener noreferrer"> {props.currentPossible1v1Match.summonerName}</a>
            </span>
        </div>
    </Modal>
  );
}

export default Join1v1Modal