import styled from 'styled-components';
import { Layout } from 'antd';

const StyledHeader = styled(Layout.Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: -120px;
  `;

const LogoImage = styled.img`
  width: 350px;
  height: auto;
  margin-right: 10px;
`;

const Title = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: white;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

export { StyledHeader, LogoContainer, LogoImage, Title, ButtonContainer };

