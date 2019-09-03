const authHeader = () => {
    let token = localStorage.getItem('token');

    if (token) {
        return 'Bearer ' + token;
    } else {
        return "";
    }
}

const logout = () => {
    localStorage.removeItem('token');
}

export 
{
    authHeader, 
    logout
}