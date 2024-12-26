import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAllTournaments, getTournamentsBasedOnGame, getAllAvalibleGames, getAllTournamentTypes } from '../Actions/Tournements';

// Define the shape of your context
interface GameTournamentContextProps {
  allAvailableGames: Game[];
  tournaments: Tournament[];
  currentSelectedGame: string;
  setCurrentSelectedGame: React.Dispatch<React.SetStateAction<string>>;
  tournamentTypes: any[]; // Add this line to include tournamentTypes
  updateTournaments: boolean; // Add this line
  setUpdateTournaments: React.Dispatch<React.SetStateAction<boolean>>; // Add this line
}

// Create the context
const GameTournamentContext = createContext<GameTournamentContextProps | undefined>(undefined);

// Define data structure for Game and Tournament
interface Game {
  id: number;
  name: string;
}

interface Tournament {
  id: number;
  name: string;
  game: Game;
}

// Context provider component
export const GameTournamentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
    const [allAvailableGames, setAllAvailableGames] = useState<Game[]>([]);
    const [allTournaments, setAllTournaments] = useState<Tournament[]>([]);  // Store all tournaments from the stream
    const [tournaments, setTournaments] = useState<Tournament[]>([]);        // Store filtered tournaments based on game selection
    const [currentSelectedGame, setCurrentSelectedGame] = useState<string>("All");
    const [tournamentTypes, setTournamentTypes] = useState<any[]>([]);
    const [updateTournaments, setUpdateTournaments] = useState(false)
    // Add this line to include tournamentTypes
  
    // Fetch games, tournament types, and initial tournaments
    useEffect(() => {
      const fetchData = async () => {
        try {
          const tournTypes = await getAllTournamentTypes();
          console.log(tournTypes);
          setTournamentTypes(tournTypes);
  
          const games = await getAllAvalibleGames();
          setAllAvailableGames(games);
  
          // Fetch initial tournaments
          const tournamentsData = await getAllTournaments();
          setAllTournaments(tournamentsData);  // Save all tournaments
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [updateTournaments]);
  
    // Handle game selection filter
    useEffect(() => {
      const filterTournaments = () => {
        if (currentSelectedGame === "All") {
          setTournaments(allTournaments);
        } else {
          const filteredTournaments = allTournaments.filter(tournament => tournament.game.name === currentSelectedGame);
          setTournaments(filteredTournaments);
        }
      };
  
      filterTournaments();
    }, [currentSelectedGame, allTournaments]);  // Re-filter whenever the game or tournaments change
  
    // Handle real-time updates via EventSource stream
    // useEffect(() => {
    //   const eventSource = new EventSource('http://localhost:8081/api/tournaments/tournaments/stream');
    
    //   eventSource.onmessage = (event) => {
    //     const updatedTournaments = JSON.parse(event.data);  // Ensure the data is valid JSON
    //     setAllTournaments(updatedTournaments);              // Update all tournaments with stream data
    //   };
      
    //   eventSource.onerror = (error) => {
    //     console.error('Error receiving updates:', error);
    //     eventSource.close();  // Close the connection if there's an error
    //   };
    
    //   return () => {
    //     eventSource.close();  // Clean up when the component unmounts
    //   };
    // }, []);
  return (
    <GameTournamentContext.Provider value={{ allAvailableGames, tournaments, currentSelectedGame, setCurrentSelectedGame, tournamentTypes, updateTournaments, setUpdateTournaments }}>
      {children}
    </GameTournamentContext.Provider>
  );
};

// Custom hook for using the context
export const useGameTournamentContext = () => {
  const context = useContext(GameTournamentContext);
  if (!context) {
    throw new Error("useGameTournamentContext must be used within a GameTournamentProvider");
  }
  return context;
};
