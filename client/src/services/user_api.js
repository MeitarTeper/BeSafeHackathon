import api from './api';

const login = async (username, password) => {
    var response = {}
    try {
        response = await api.post('/users/login', {
            username: username,
            password: password
        });
        response = response.data.message;
    } catch (error) {
        console.error('Error logging in:', error);
    }
    return response;
};

const signUp = async (username, password) => {
    var response = {}
    try {
        response = await api.post('/users/signup', {
            username: username,
            password: password
        });
        response = response.data.message;
    } catch (error) {
        console.error('Error signing up:', error);
    }
    return response;
};

export { login, signUp };
