import { Router } from "express";
import { sample_items, sample_tags } from "../data.js";

const router = Router();

router.get('/menu', (req, res) => {
    res.send(sample_items);
});

router.get('/menu/tags', (req, res) => {
    res.send(sample_tags);
});


router.get('/menu/search/:searchTerm', (req, res) => {
    const { searchTerm } = req.params;
    const search = sample_items.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    res.send(search)   
});

router.get('/menu/search/:searchTerm', (req, res) => {
    const { searchTerm } = req.params;
    const search = sample_items.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    res.send(search)   
});

router.get('/menu/tag/:tag', (req, res) => {
    const { tag } = req.params;
    const tags = sample_items.filter(item => item.tags?.includes(tag));
    res.send(tags);
});

router.get('/menu/item/:id', (req, res) => {
    const { id } = req.params;
    const item = sample_items.find(item => item.id === id);
    res.send(item);
});



export default router;
