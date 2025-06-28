import { Router } from "express";
import { ItemModel } from "../models/item.model.js";
import handler from "express-async-handler";

const router = Router();

router.get('/menu', handler(async (req, res) => {
    const items = await ItemModel.find({});
    res.send(items);
}));

router.get('/menu/tags', handler(async (req, res) => {
    const tags = await ItemModel.aggregate([
        {
            $unwind: '$tags',
        },
        {
            $group: {
                _id: '$tags',
                count: {$sum: 1}
            },
        },
        {
            $project : {
                _id: 0,
                name: '$_id',
                count: '$count',
            },
        }
    ]).sort({count: -1 });


    res.send(tags)
}));


router.get('/menu/search/:searchTerm', handler(async (req, res) => {
    const { searchTerm } = req.params;
    const searchRegex = new RegExp(searchTerm, 'i');
    
    const search = await ItemModel.find({name: { $regex: searchRegex }})
    res.send(search)   
}));


router.get('/menu/tag/:tag', handler(async (req, res) => {
    const { tag } = req.params;
    const tags = await ItemModel.find({tags: tag});
    res.send(tags);
}));

router.get('/menu/item/:id', handler(async (req, res) => {
    const { id } = req.params;
    const item = await ItemModel.findById(id);
    res.send(item);
}));



export default router;
