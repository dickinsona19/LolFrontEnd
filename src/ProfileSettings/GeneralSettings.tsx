import React,{useState} from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { MainCard, AvatarIconCard,LinkedAccountsBox } from './ProfileSettingsStyles';
import { Upload, Button, Spin, Image, Typography } from 'antd';

import { useCurrentUser } from '../Context/CurrentUserContext';
import { uploadUserPictureFile } from '../Actions/Users';
const GeneralSettings = () => {
    const [loading, setLoading] = useState(false);
const [imagePath, setImagePath] = useState('https://firebasestorage.googleapis.com/v0/b/hextechbets.firebasestorage.app/o/profile_pics%2F1736185656095-Season_2022_-_Master.webp?alt=media&token=fac09ff0-4dac-477f-b0ca-3ddd85034eb8');
 const { currentUser } = useCurrentUser();

    const handleFileChange = async (info : any) => {
        const file = info.file.originFileObj; // Get the file from the upload component
        if (file) {
          setLoading(true);
          const response = await uploadUserPictureFile(file);
          setLoading(false);
    
          if (response) {
            setImagePath(response); // Assuming the response is the file path or URL
          }
        }
      };
  return (
<MainCard>
    <div style={{ display: 'flex' }}>
        <LinkedAccountsBox>
        <Typography.Title level={2} style={{ margin: 0, color: '#999', fontWeight: 'bold' }}>
          Linked Accounts:
        </Typography.Title>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Button type="primary" href="https://www.riotgames.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=identify">
            Link Riot Account
          </Button>
          <Button type="primary" href="https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=identify">
            Link Discord
          </Button>
          <Button type="primary" href="https://id.twitch.tv/oauth2/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=channel:read:subscriptions">
            Link Twitch
          </Button>
          {/* Add more buttons for other platforms as needed */}
        </div>
        </LinkedAccountsBox>
        <AvatarIconCard>
            <Typography.Title level={1} style={{ margin: 0, color: '#999', fontWeight: 'bold' }}>
              Profile Picture:
            </Typography.Title>
            <Image src={imagePath}></Image>
            <Spin spinning={loading}>
              <Upload
                accept="image/*"
                onChange={handleFileChange}
                showUploadList={false}
                beforeUpload={() => setLoading(true)}
                onRemove={() => setLoading(false)}
              >
                <Button icon={<UploadOutlined />}>Click to update</Button>
              </Upload>
            </Spin>
        </AvatarIconCard>
    </div>
</MainCard>
  )
}

export default GeneralSettings