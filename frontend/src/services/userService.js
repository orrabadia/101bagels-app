import axios from "axios";

export const getUser = () => localStorage.getItem('user') ?
    JSON.parse(localStorage.getItem('user')) : null;

export const login = async(email, password) => {
    try {
        const { data } = await axios.post('/api/users/login', { email, password });
        localStorage.setItem('user', JSON.stringify(data));
        return data;
    } catch (err) {
        // Re-throw so AuthProvider can show toast
        throw err;
    }
};

export const register = async registerData => {
    const { data } = await axios.post('/api/users/register', registerData);
    localStorage.setItem('user', JSON.stringify(data));
    return data;
}

export const logout = () => {
    localStorage.removeItem('user');
};

export const updateProfile = async user => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const token = currentUser?.token;

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.put('/api/users/updateProfile', user, config);
    localStorage.setItem('user', JSON.stringify(data));
    return data;

}
export const changePassword = async passwords => {

    const currentUser = JSON.parse(localStorage.getItem('user'));
    const token = currentUser?.token;

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    
    await axios.put('/api/users/changePassword', passwords)

}