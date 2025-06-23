import { sample_items } from "../data";

export const getAll = async () => sample_items;

export const search = async (searchTerm) => sample_items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()));