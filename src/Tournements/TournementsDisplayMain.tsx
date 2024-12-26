import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Flex, Button, Select } from 'antd';
import CreateTournModal from './CreateTournModal';
import { useCurrentUser } from '@/Context/CurrentUserContext';
import ModalPopUp from '@/SignUpAndIn/ModalPopUp';
import { useGameTournamentContext } from '../Context/GameTournamentContext';
import { Link } from 'react-router-dom'; // Add this import
import TournamentCard from './TournamentCard';
interface Tournament {
  id: number;
  name: string;
  game: Game;
}

interface Game {
  name: string;
}

const TournamentsDisplayMain = () => {
  const [isCreateTournModalOpen, setIsCreateTournModalOpen] = useState(false);
  const { currentUser } = useCurrentUser();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const { allAvailableGames, tournaments, currentSelectedGame, setCurrentSelectedGame } = useGameTournamentContext();

  function handleCreateTournamentButtonClick(){
    if(currentUser !=  null){
      setIsCreateTournModalOpen(true)
    }
    else{
      setIsLoginModalOpen(true);
    }
  }



  const handleChange = (value: string) => {
    setCurrentSelectedGame(value);
  };

  return (
    <>
    <ModalPopUp isModalOpen={isLoginModalOpen} setIsModalOpen={setIsLoginModalOpen} modalState={0} />
    <CreateTournModal isModalOpen={isCreateTournModalOpen} setIsModalOpen={setIsCreateTournModalOpen}/>




      <Row justify="space-between" align="middle">
        <Row justify="space-between" align="middle" style={{ marginBottom: '20px' }}>
          <Col>
            <Select
              defaultValue={currentSelectedGame}
              style={{ width: '14em', height: '3em', marginLeft: '1.2em' }}
              onChange={handleChange}
              options={[
                { value: 'All', label: 'All' },
                ...allAvailableGames.map((game: Game) => ({ value: game.name, label: game.name })),
              ]}
            />
          </Col>
        </Row>
        <Col>
          <Button type="primary" size="middle" onClick={()=> handleCreateTournamentButtonClick()}>Create Tournament</Button>
        </Col>
      </Row>
      <Flex wrap justify={'space-evenly'} align={'center'}>
        {tournaments.map((tournament: Tournament, index: number) => (
          <>
          <Link to={`/tournament/${tournament.id}`}>
         
            <TournamentCard key={index} tournament={tournament}/>
          </Link>
          </>

          
        ))}
      </Flex>
    </>
  );
}

export default TournamentsDisplayMain;
