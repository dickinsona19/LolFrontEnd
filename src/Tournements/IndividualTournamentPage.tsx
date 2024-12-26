import {getTournamentBasedOnId} from '../Actions/Tournements'
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Define the Tournament interface
interface Tournament {
  name: string;
  // Add other properties as needed
}

const IndividualTournamentPage = () => {
 
 
  const { id } = useParams();
  const [tournament, setTournament] = useState<Tournament | null>(null);

  useEffect(() => {
    const fetchTournament = async () => {
      const tournamentData = await getTournamentBasedOnId(id);
      setTournament(JSON.parse(JSON.stringify(tournamentData)));
    };
    fetchTournament();
  }, [id]);

  return (
    <p>{tournament ? tournament.name : 'Loading...'}</p>
  )
}

export default IndividualTournamentPage
