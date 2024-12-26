let API_URL = 'http://localhost:8081/api/tournaments'


export const getAllTournaments = async () => {
    try {
        const response = await fetch('http://localhost:8081/api/tournaments', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error making GET request:', error);
        throw error;
    }
};

export const getTournamentsBasedOnGame = async (game) => {
    try {
        const response = await fetch(`${API_URL}/game/${game}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error making GET request:', error);
        throw error;
    }
};

export const getAllAvalibleGames = async () => {
    try {
        const response = await fetch('http://localhost:8081/api/games', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error making GET request:', error);
        throw error;
    }
};



export const createNewTournament = async (tournamentData) => {
    try {
        const response = await fetch('http://localhost:8081/api/tournaments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tournamentData),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error making POST request:', error);
        throw error;
    }
};

export const getAllTournamentTypes = async () => {
    try {
        const response = await fetch('http://localhost:8081/api/tournamentTypes/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error making GET request:', error);
        throw error;
    }
};

export const getTournamentBasedOnId = async (id) => {
    try {
        const response = await fetch(`http://localhost:8081/api/tournaments/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error making GET request:', error);
        throw error;
    }
};