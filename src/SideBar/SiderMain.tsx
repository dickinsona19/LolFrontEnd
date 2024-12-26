import { useState, useEffect } from 'react';
import { Layout, Menu,Button } from 'antd';
const { Sider,  } = Layout;    
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import {
 FieldTimeOutlined,
} from '@ant-design/icons';
import { RxAvatar } from "react-icons/rx";
import { TiWeatherStormy } from "react-icons/ti";
import { CgBoard } from "react-icons/cg";
import { IoIosHome } from "react-icons/io";
type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  { key: 'Home', icon: <IoIosHome />, label: (<Link to={`/`}> Home </Link>) },
  { key: 'Quick Play', icon: <FieldTimeOutlined />, label: (<Link to={`/features/QuickPlay`}> Quick Play </Link>) },
  { key: 'Featured Tournements', icon: <CgBoard />, label: (<Link to={`/features/FeaturedTournements`}> Featured Tournements </Link>) },
  { key: 'My Tournements', icon: <TiWeatherStormy />, label: (<Link to={`/features/MyTournements`}>My Tournements</Link>) },
  { key: 'Profile Settings', icon: <RxAvatar />, label: (<Link to={`/features/ProfileSettings`}> Profile Settings </Link>) },
]




const SiderMain = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [selectedKeys] = useState<string[]>(items.find(item => item.label.props.to === window.location.pathname)?.key);

  return (
    <Sider width={200}  collapsed={collapsed} theme="dark" >
      <Button onClick={() => setCollapsed(!collapsed)} style={{ width: '100%', borderRadius: '0'}}>{collapsed === false? <LeftOutlined /> :<RightOutlined />} </Button>

    <Menu
      mode="inline"
      defaultSelectedKeys={selectedKeys}
      defaultOpenKeys={['sub1']}
      style={{ height: '100%', borderRight: 0 }}
      items={items}
    />

  </Sider>
  )
}

export default SiderMain
