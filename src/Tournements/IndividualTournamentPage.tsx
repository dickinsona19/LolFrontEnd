import { getTournamentBasedOnId } from '../Actions/Tournements';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Info from './components/Info'; // Import Info component
import Players from './components/Players'; // Import Players component

// Define the Tournament interface
interface Tournament {
  name: string;
  description: string;
  players: string[];
}

const IndividualTournamentPage = () => {
  const { id } = useParams();
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'info' | 'players'>('info');

  useEffect(() => {
    const fetchTournament = async () => {
      const tournamentData = await getTournamentBasedOnId(id);
      setTournament(JSON.parse(JSON.stringify(tournamentData)));
      setIsLoading(false);
    };
    fetchTournament();
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex justify-center m-10">
      <div className="w-1/2 bg-slate-500 rounded-lg p-6 relative">
        {/* Tabs */}
        <div className="absolute -top-6 left-0 right-0 flex justify-center">
          <div className="flex space-x-4 bg-slate-600 rounded-full px-4 py-1 shadow-md">
            <button
              className={`py-2 px-6 text-lg rounded-full ${
                activeTab === 'info'
                  ? 'bg-cyan-700 text-white font-bold'
                  : 'bg-slate-400 text-black'
              }`}
              onClick={() => setActiveTab('info')}
            >
              Info
            </button>
            <button
              className={`py-2 px-6 text-lg rounded-full ${
                activeTab === 'players'
                  ? 'bg-cyan-700 text-white font-bold'
                  : 'bg-slate-400 text-black'
              }`}
              onClick={() => setActiveTab('players')}
            >
              Players
            </button>
          </div>
        </div>
  
        {/* Content Area */}
        <div className="mt-8">
          {activeTab === 'info' && (
            <Info name={tournament?.name || ''} description={tournament?.description || ''} />
          )}
          {activeTab === 'players' && (
            <Players players={tournament?.players || []} />
          )}
        </div>
      </div>
    </div>
  );
};

export default IndividualTournamentPage;
