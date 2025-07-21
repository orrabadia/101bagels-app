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

export const getLatestOrderForCurrentUser = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;
    
    const { data } = await axios.get('/api/orders/latestOrderForCurrentUser', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return data;
};

export const getOrderById = async (orderId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;
    
    const { data } = await axios.get(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

export const findOrderById = async orderId => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    const { data } = await axios.get(`/api/orders/my-orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
}

export const getAllOrders = async () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = user?.token;

    const { data } = await axios.get('/api/orders/my-orders', {
        headers: { Authorization: `Bearer ${token}` },
    })

    return data;
}