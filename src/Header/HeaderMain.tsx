import  { useState } from 'react';
import { Button as AntdButton } from 'antd';
import { StyledHeader, Title, ButtonContainer, LogoImage, LogoContainer } from './HeaderMainStyles';
import ModalPopUp from '../SignUpAndIn/ModalPopUp';
import { useCurrentUser } from '../Context/CurrentUserContext';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space, Dropdown, Menu } from 'antd';
import { Link, Route } from 'react-router-dom';
import logo from '../assets/HextechBetsLogo.png'; // Add this import
import type { MenuProps } from 'antd'; // Add this import
import {handleLogout} from '../Actions/Users.js'


const HeaderMain = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalState, setModalState] = useState(0);
  const { currentUser, setCurrentUser } = useCurrentUser();
  function handleProfileOpenOnClick(){
    return ;
  }

  const handleLogoutClick = () => {
    setCurrentUser(null);
   handleLogout()    
  };
  
  const openModal = (state: number) => {
    setIsModalOpen(true);
    setModalState(state);
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
       
          <Link to="/features/ProfileSettings">Profile Settings</Link>
      
      ),
    },
    {
      key: '2',
      label: (
        <Link to="/" onClick={handleLogoutClick}>
          Log out
        </Link>
      ),
    }
  ];

  return (
    <StyledHeader>
      <ModalPopUp isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} modalState={modalState}/>
     
        <Link to="/">
          <LogoContainer style={{ }}>
            <LogoImage src={logo} alt="Logo" style={{}} />
          </LogoContainer>
        </Link>
      


      {currentUser === null ? (
        <ButtonContainer>
          <AntdButton type="primary" style={{ marginRight: '10px' }} onClick={() => openModal(0)}>Login</AntdButton>
          <AntdButton type="primary" onClick={() => openModal(1)}>Sign Up</AntdButton>
        </ButtonContainer>
      ):       
      <Space direction="vertical" size={16}>
      <Space wrap size={16}>
       <Dropdown menu={{items}} placement="bottomRight" arrow={{ pointAtCenter: true }}>
           <Avatar size={48} icon={<UserOutlined />} />
       </Dropdown>


      <p style={{color:'White'}}>{currentUser.username}</p>
      </Space>
      </Space>}
    </StyledHeader>
  );
}

export default HeaderMain;
