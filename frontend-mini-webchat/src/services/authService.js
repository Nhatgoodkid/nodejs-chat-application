import API from './api';

const AuthService = {
    login: (data) => {
        return API.post('auth/login', data)
            .then(({ data }) => {
                API.defaults.headers['Authorization'] = `Bearer ${data.token}`;
                return data;
            })
            .catch((err) => {
                console.log('Auth service err', err);
            });
    },

    register: (data) => {
        return API.post('auth/register', data)
            .then(({ data }) => {
                API.defaults.headers['Authorization'] = `Bearer ${data.token}`;
                return data;
            })
            .catch((err) => {
                console.log('Auth service err', err);
            });
    },

    logout: (data) => {
        API.defaults.headers['Authorization'] = ''
    },
};

export default AuthService;
