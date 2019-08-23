import config from '../config/config';
import { authHeader } from '../helpers/auth-helper';
import axios from 'axios';

const login = (username, password) => {

    axios.post(`${config.apiUrl}/users/login`,
        {
            login: username,
            password: password
        })
        .then(res => res.data)
        .then(response => {
            localStorage.setItem('token', response.token);
            return true;
        });
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
        .then(response => response.data)
        .then(result => {
            console.log(result);
            return {
                data: result.users,
                page: result.page,
                totalCount: result.totalCount
            }
        });
}


// function handleResponse(response) {
//     return response.text().then(text => {
//         const data = text && JSON.parse(text);
//         if (!response.ok) {
//             if (response.status === 401) {
//                 // auto logout if 401 response returned from api
//                 logout();
//                 location.reload(true);
//             }

//             const error = (data && data.message) || response.statusText;
//             return Promise.reject(error);
//         }

//         return data;
//     });
// }

export {
    login,
    register,
    getUsers,
    getRoles
}