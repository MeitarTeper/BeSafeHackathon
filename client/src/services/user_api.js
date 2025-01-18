import api from './api';

const login = async (usename, password) => {
    var response = {}
    try {
        response = await api.post('/users/login', {
            usename: usename,
            password: password
        });
        response = response.data.message;
    } catch (error) {
        console.error('Error logging in:', error);
    }
    return response;
};

const signUp = async (usename, password) => {
    var response = {}
    try {
        response = await api.post('/users/signup', {
            params: {
                usename: usename,
                password: password
            }
        });
        response = response.data.message;
    } catch (error) {
        console.error('Error signing up:', error);
    }
    return response;
};

export { login, signUp };
