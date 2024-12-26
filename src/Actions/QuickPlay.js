let API_URL = 'http://localhost:8081/api/quickplay'


export const getAllQuickPlays = async () => {
    try {
        const response = await fetch(API_URL, {
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

export const addAQuickPlay = async (quickPlayData) =>{
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(quickPlayData),
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

export const deleteQuickPlay = async (quickplayId) =>{
    try {
        const response = await fetch(API_URL +"/"+quickplayId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(quickPlayData),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error making POST request:', error);
        throw error;
    }
}