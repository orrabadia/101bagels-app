import axios from "axios";

export const createOrder = async order => {

    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    try {
        const { data } = await axios.post('/api/orders/create', order, {headers: {Authorization: `Bearer ${token}`}});
        return data;
    } catch (error) {
        console.error("Error creating order: ", error)
    }
}

export const getNewOrderForCurrentUser = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;
    
    const { data } = await axios.get('/api/orders/newOrderForCurrentUser', {
        headers: { Authorization: `Bearer ${token}` }
    });
    return data;
};