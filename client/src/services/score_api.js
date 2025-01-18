import api from './api';

const addScore = async (playerName, gameName, score) => {
    var response = {}
    try {
        response = await api.post('/scores/add', {
            playerName: playerName,
            gameName: gameName,
            score: score
        });
        response = response.data;
    } catch (error) {
        console.error('Error adding score:', error);
    }
    return response;
};

const getScores = async (gameName) => {
    var response = {}
    try {
        response = await api.get('/scores/get', {
            params: {
                gameName: gameName
            }
        });
        response = response.data.scores;
    } catch (error) {
        console.error('Error fetching scores:', error);
    }
    return response;
};

export { addScore, getScores };
