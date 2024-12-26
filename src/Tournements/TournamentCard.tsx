import React from 'react'
import { Card } from 'antd'

interface Tournament {
  id: number;
  name: string;
  game: Game;
  description: string;
  
}

interface Game {
  id: number;
  name: string;
}

interface TournamentCardProps {
  tournament: Tournament;
}

const TournamentCard: React.FC<TournamentCardProps> = ({ tournament }) => {
  return (
    <Card title={tournament.name} bordered={true} style={{ margin: '1em', flex: 1, minWidth: 'calc(20% - 16px)' }}>
      <p>{tournament.description}</p>
    </Card>
  );
}

export default TournamentCard;
