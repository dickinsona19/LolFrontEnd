import React from 'react';

interface InfoProps {
  name: string;
  description: string;
}

const Info: React.FC<InfoProps> = ({ name, description }) => {
  return (
    <div>
      <h1 className="text-3xl font-extrabold mb-4">{name}</h1>
      <p>{description}</p>
    </div>
  );
};

export default Info;
