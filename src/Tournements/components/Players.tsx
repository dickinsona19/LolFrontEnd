import React from 'react';

interface PlayersProps {
  players: string[];
}

const Players: React.FC<PlayersProps> = ({ players }) => {
  return (
    <div>
      <h2 className="text-3xl font-extrabold mb-4">Current Players</h2>
      <ul className="list-none">
        {players.length > 0 ? (
          players.map((player, index) => (
            <li
              key={index}
              className="py-2 border-b last:border-none"
            >
              {player}
            </li>
          ))
        ) : (
          <li>No players have joined yet.</li>
        )}
      </ul>
    </div>
  );
};

export default Players;
