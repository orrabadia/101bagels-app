import {connect, set} from 'mongoose';
import { UserModel } from '../models/user.model.js';
import { ItemModel } from '../models/item.model.js';
import { sample_users, sample_items } from '../data.js';
import bcrypt from 'bcryptjs';

import { PASSWORD_HASH_SALT_ROUNDS } from '../constants/dbHash.js';

set('strictQuery', true);

export const dbconnect = async () => {
    try {
        await connect(process.env.MONGO_URI)
        console.log('Connect Successfully');
        await seedUsers();
        await seedItems();
    } catch (err) {
        console.log(err);
    }
};

async function seedUsers() {
    const usersCount = await UserModel.countDocuments();
    if (usersCount > 0) {
        console.log("Users seed is already done!");
        return;
    }

    // Change
    for (let user of sample_users) {
        user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
        await UserModel.create(user);
    }
    console.log("User seed done!");
}

async function seedItems() {
    const items = await ItemModel.countDocuments();
    if (items > 0) {
        console.log("Items seed is already done!");
        return;
    }

    // Change
    for (const item of sample_items) {
        item.imageUrl = `/menu-items/${item.imageUrl}`
        await ItemModel.create(item);
    }
    console.log("Item seed done!");
}