import { sample_items, sample_tags } from "../data";

export const getAll = async () => sample_items;

export const search = async (searchTerm) => sample_items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()));

export const getAllTags = async () => sample_tags;

export const getAllByTag = async tag => {
    if (tag === 'All') return getAll();
    return sample_items.filter(item => item.tags?.includes(tag));
};

export const getByID = async itemID => sample_items.find(item => item.id === itemID);