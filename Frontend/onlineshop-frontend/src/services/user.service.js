import config from '../config/config';
import { authHeader, logout } from '../helpers/auth-helper';
import axios from 'axios';

const login = (username, password) => {
    return axios.post(`${config.apiUrl}/users/login`,
        {
            login: username,
            password: password
        })
        .then(res => res.data)
        .then(response => {
            console.log(response.token);
            localStorage.setItem('token', response.token);
            return true;
        }).catch(() => false);
}

const getRoles = () => {
    var obj = {};

    axios.get(`${config.apiUrl}/roles`,
        {
            headers: {
                Authorization: authHeader()
            }
        })
        .then(res => res.data)
        .then(res => res.map(v => {

            obj[v._id] = v.name;

            return { "v._id": "v.name" };
        }))
    return obj;
}

const register = (user) => {

    return fetch(`${config.apiUrl}/users/register`, user)
        .then(res => res.json())
}

const getUsers = (query) => {
    return axios.get(`http://localhost:6002/users?limit=${query.pageSize}&offset=${query.page}`,
        {
            headers: {
                Authorization: authHeader()
            }
        })
        .then(handleResponse)
        .then(result => {
            return {
                data: result.users,
                page: result.page,
                totalCount: result.totalCount
            }
        })
        .catch(error => console.log('error'));
}



function handleResponse(response) {

    const data = response.data;
    if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        window.location.reload();
    }
    return data;
}

export {
    login,
    register,
    getUsers,
    getRoles
}