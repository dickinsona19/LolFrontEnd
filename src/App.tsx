import { Breadcrumb,ConfigProvider, Layout, Menu, theme } from 'antd';
import HeaderMain from './Header/HeaderMain';
import SiderMain from './SideBar/SiderMain';
const {Content } = Layout;
import { CurrentUserProvider } from './Context/CurrentUserContext'
import TournamentsDisplayMain from './Tournements/TournementsDisplayMain';
import { GameTournamentProvider } from './Context/GameTournamentContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IndividualTournamentPage from './Tournements/IndividualTournamentPage';
import { Toaster } from "@/components/ui/toaster"
import QuickPlayPageContent from './QuickPlay/QuickPlayPageContent';
import ProfileSettingsMain from './ProfileSettings/ProfileSettingsMain';

const App = () => (
  <Router>
<GameTournamentProvider>
<CurrentUserProvider>
  <ConfigProvider
  theme={{
    algorithm: theme.darkAlgorithm,
  }}
  >
     <Layout style={{ minHeight: '100vh' }}>
     <HeaderMain ></HeaderMain>
     <Layout><SiderMain/>
     <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
             <Toaster />
      <Routes>
        <Route path=''  element={<TournamentsDisplayMain/>}/>
        <Route path='/features/QuickPlay' element={<QuickPlayPageContent/>}/>
        <Route path='/features/ProfileSettings/*' element={<ProfileSettingsMain/>}/>
        <Route path="/tournament/:id" element={<IndividualTournamentPage />} />
      </Routes>




    </Content>
    </Layout>
    </Layout>
    </Layout>
 
  </ConfigProvider>
  </CurrentUserProvider>
  </GameTournamentProvider>
  </Router>
);

export default App;