import {Typography, Menu } from 'antd';
import { BrowserRouter as  Router, Route, Routes, Link } from 'react-router-dom';
import GeneralSettings from './GeneralSettings';

const ProfileSettingsMain = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '20%', marginRight: '20px' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['/profile/general']}
          defaultOpenKeys={['/profile']}
          style={{ borderRight: 0 }}

        >
            <Menu.Item key="/profile/general"><Link to="/features/ProfileSettings/General">General</Link></Menu.Item>
            <Menu.Item key="/profile/security"><Link to="/features/ProfileSettings/Security">Security</Link></Menu.Item>
            <Menu.Item key="/profile/wallet"><Link to="/features/ProfileSettings/Wallet">Wallet</Link></Menu.Item>
     
        </Menu>
      </div>
      <div style={{ flex: 1 }}>
        <Typography.Title level={1} style={{ margin: 0, color: '#ccc', fontWeight: 'bold' }}>
          Profile Settings
        </Typography.Title>
        
        
        <Routes>
        <Route path='/General' element={<GeneralSettings/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default ProfileSettingsMain;
