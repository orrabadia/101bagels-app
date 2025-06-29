import axios from "axios";


export const getAll = async () => {
    const { data } = await axios.get('/api/items/menu');
    return data;
}

export const search = async (searchTerm) => {
    const { data } = await axios.get('/api/items/menu/search/' + searchTerm)
    return data;
}

export const getAllTags = async () => {
    const { data } = await axios.get('/api/items/menu/tags')
    return data;
}

export const getAllByTag = async tag => {
    if (tag === 'All') return getAll();
    const { data } = await axios.get('/api/items/menu/tag/' + tag)
    return data; 
};

export const getByID = async itemID => {
    const { data } = await axios.get('/api/items/menu/item/' + itemID)
    return data; 
}

// you need to fix the image Route because I think the folder Structure messes it up