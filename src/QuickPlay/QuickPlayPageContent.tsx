import React, { useState, useEffect } from 'react'
import { Avatar, Card, List, Input, Divider,Button, Typography } from "antd";
import {getAllQuickPlays, deleteQuickPlay} from '../Actions/QuickPlay.js'
import Create1v1Modal from './Create1v1Modal.jsx'
import { useCurrentUser } from '@/Context/CurrentUserContext.js';
import ModalPopUp from '@/SignUpAndIn/ModalPopUp.js';
import Join1v1Modal from './Join1v1Modal.jsx';

import ironIcon from './LeagueRankes/iron.png'
import bronzeIcon from './LeagueRankes/bronze.webp'
import silverIcon from './LeagueRankes/silver.png'
import goldIcon from './LeagueRankes/gold.webp'
import platinumIcon from './LeagueRankes/platinum.webp'
import emeraldIcon from './LeagueRankes/emerald.webp'
import diamondIcon from './LeagueRankes/diamond.png'
import masterIcon from './LeagueRankes/master.png'
import grandmasterIcon from './LeagueRankes/grandmaster.png'
import challengerIcon from './LeagueRankes/challenger.webp'
import  opggIcon from '../assets/op-gg-icon.png'


interface QuickPlayData {
  id: number;
  title: string;
  summonerName: string;
  bid: number;
  rank: string;
  host: any;
  username: string;
}

const rankIcons = {
  "iron": ironIcon,
  "bronze": bronzeIcon,
  "silver": silverIcon,
  "gold": goldIcon,
  "platinum": platinumIcon,
  "emerald": emeraldIcon,
  "diamond": diamondIcon,
  "master": masterIcon,
  "grandmaster": grandmasterIcon,
  "challenger": challengerIcon,
};




const QuickPlayPageContent = () => {
  const { currentUser } = useCurrentUser();
  const [is1v1ModalOpen, setIs1v1ModalOpen] = useState(false);
  const [QuickPlayData, setQuickPlayData] = useState<QuickPlayData[]>([]);
  const [filteredData, setFilteredData] = useState<QuickPlayData[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [userIsAlreadyHosting, setUserIsAlreadyHosting] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isJoin1v1ModalOpen, setIsJoin1v1ModalOpen] = useState(false)
  const [currentPossible1v1Match, setCurrentPossible1v1Match] = useState({});
  const [reSearchQuickplayValue, setReSearchQuickplayValue] = useState(false);
  
  
  const handleCreate1v1ButtonClick = ()=> {
    if(currentUser){
      setIs1v1ModalOpen(true)
    }
    else{
      setIsLoginModalOpen(true)
    }
  };

  const handleJoin1v1ButtonClick =(item:any)=>{
    if(currentUser){
      setIsJoin1v1ModalOpen(true); 
      setCurrentPossible1v1Match(item);
    }
    else{
      setIsLoginModalOpen(true)
    }
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllQuickPlays();
        const processedData = data.map((item: any) => {
          setUserIsAlreadyHosting(false)
          if(item.host.username == currentUser?.username){setUserIsAlreadyHosting(true)}
          const summonerAccount = item.host.linkedAccounts.find(
            (account: any) => account.accountTypeName === "LeagueOfLegendsAccount"
          );
          return {
            id: item.id,
            title: item.title,
            summonerName: summonerAccount ? summonerAccount.accountIdentifier : "Unknown",
            bid: item.bid,
            rank: item.rank,
            host:item.host,
          };
        });
        setQuickPlayData(processedData);
      } catch (error) {
        console.error('Error fetching quick plays:', error);
      }
    };

    fetchData();
  }, [currentUser, reSearchQuickplayValue]);
  

  const handleSearch = (e:any) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);
  };

  useEffect(() => {
    const filtered = QuickPlayData.filter(item => item.host.username.toLowerCase().includes(searchValue));
    setFilteredData(filtered);
  }, [searchValue, QuickPlayData, reSearchQuickplayValue]);
  const handleDelete1v1 = async (id:number) => {
    try {
      await deleteQuickPlay(id);
      setReSearchQuickplayValue(!reSearchQuickplayValue);
      console.log('Quick play deleted successfully');
    } catch (error) {
      console.error('Error deleting quick play:', error);
    }
  }

  return (

<div>
 <ModalPopUp isModalOpen={isLoginModalOpen} setIsModalOpen={setIsLoginModalOpen} modalState={0}/>
  <Create1v1Modal currentUser={currentUser} is1v1ModalOpen={is1v1ModalOpen} setIs1v1ModalOpen={setIs1v1ModalOpen} reSearchQuickplayValue={reSearchQuickplayValue} setReSearchQuickplayValue={setReSearchQuickplayValue}/>
  <Join1v1Modal currentUser={currentUser} isJoin1v1ModalOpen={isJoin1v1ModalOpen} setIsJoin1v1ModalOpen={setIsJoin1v1ModalOpen} currentPossible1v1Match={currentPossible1v1Match}/>


<div style={{ textAlign: 'center', margin: '20px' }}>
  <Typography.Title level={1} style={{ fontWeight: 'bold' }}>Quick Play</Typography.Title>
</div>
 <div style={{ display: 'flex', justifyContent: 'center',  height: '100%' }}>
      <Card bordered={true} style={{ width: '80%' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '10px' }}>

          {userIsAlreadyHosting ? <Button type="primary" disabled onClick={handleCreate1v1ButtonClick}>Already Hosting</Button> :<Button type="primary" onClick={handleCreate1v1ButtonClick}>Create 1v1</Button>}
        </div>
        <Input placeholder="Search" onChange={handleSearch} style={{ marginBottom: '10px' }} />
        <List
          pagination={{ position: 'bottom', align: 'center' }}
          dataSource={filteredData}

          renderItem={(item, index) => (
            <div>

              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={rankIcons['challenger']} />}
                  title={<span>{item.host.username}</span>}
                  description={item.bid}
                />
         
                
                {currentUser?.username === item.host.username ? (
                  <>
                    <Button color="danger" variant="solid" style={{ marginLeft: '5px' }} onClick={() =>{handleDelete1v1(item.id)}}>Delete</Button>
                  </>
                )
                :( <>
                  <a href={`https://www.op.gg/summoners/na/${item.summonerName}-NA1`} style={{ width: '3%' }} target="_blank" rel="noopener noreferrer">
                  <img src={opggIcon}  />
                  </a>
                  <Divider type="vertical" style={{ height: '50px' }}/>
             <Button color="primary" variant="outlined" style={{ marginLeft: 'auto' }} onClick={() =>{handleJoin1v1ButtonClick(item)}}>Join</Button>
                </>)}
              </List.Item>
              <Divider style={{ marginTop: '0px' }}/>
            </div>
          )}
        />
      </Card>
    </div>
  </div>
   
  )
}

export default QuickPlayPageContent