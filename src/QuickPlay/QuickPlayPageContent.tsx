import React, { useState, useEffect } from 'react'
import {getAllQuickPlays} from '../Actions/QuickPlay'
import { useCurrentUser  } from '@/Context/CurrentUserContext.js';
import QuickPlayQueueView from './QuickPlayQueueView.js';

interface QuickPlayData {
  id: number;
  title: string;
  summonerName: string;
  bid: number;
  rank: string;
  host: any;
  username: string;
  challenger: any;
}




const QuickPlayPageContent = () => {
  const { currentUser, setIsParticipatingInQuickPlay, isParticipatingInQuickPlay } = useCurrentUser();
  const [reSearchQuickplayValue, setReSearchQuickplayValue] = useState(false);
  
  
 
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllQuickPlays();
        const processedData = data.map((item: any) => {
          if(item.host.username == currentUser?.username){setUserIsAlreadyHosting(true)}
          const summonerAccount = item.host.linkedAccounts.find(
            (account: any) => account.accountTypeName === "LeagueOfLegendsAccount"
          );
          
          if(item.challenger?.username == currentUser?.username){
            setIsParticipatingInQuickPlay(false)
          }

          return {
            id: item.id,
            title: item.title,
            summonerName: summonerAccount ? summonerAccount.accountIdentifier : "Unknown",
            bid: item.bid,
            rank: item.rank,
            host:item.host,
            challenger: item.challenger,
          };
        });
        setQuickPlayData(processedData);
      } catch (error) {
        console.error('Error fetching quick plays:', error);
      }
    };

    fetchData();
  }, [currentUser, reSearchQuickplayValue]);
  


  return (
isParticipatingInQuickPlay?
<></>
: <QuickPlayQueueView />
  )
}

export default QuickPlayPageContent