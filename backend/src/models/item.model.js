import {model, Schema} from 'mongoose';

export const ItemStruct = new Schema(
    {
        name: {type: String, required: true},
        price: {type: Number, required: true},
        favorite: {type: Boolean, default: false},
        stars: {type: Number, default: 4.5},
        imageUrl: {type: String, required: true},
        tags: {type: [String]},
    },
    {
        toJSON: {
            virtuals: true,
        },
        toObject : {
            virtuals: true,
        }
    }
);

export const ItemModel = model('item', ItemStruct);