export function authHeader() {
    let token = localStorage.getItem('token');

    if (token) {
        return 'Bearer ' + token;
    } else {
        return "";
    }
}