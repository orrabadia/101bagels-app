import {Router} from 'express';
import { sample_users } from '../data.js';
import jwt from 'jsonwebtoken'
import { BAD_REQUEST } from '../constants/httpStatus.js';
import { PASSWORD_HASH_SALT_ROUNDS } from '../constants/dbHash.js';
import handler from 'express-async-handler';
import { UserModel } from '../models/user.model.js';
import bcrypt from 'bcryptjs'

const router = Router();

router.post('/login', handler(async (req, res) => {
    const {email, password } = req.body;
    const user = await UserModel.findOne({email});
    

    if (user && (await bcrypt.compare(password, user.password))) {
        res.send(generateTokenResponse(user))
        return;
    }

    res.status(BAD_REQUEST).send('Username or password is invalid');

}));

router.post('/register', handler(async (req, res) => {
    
    // will need to put phone number
    const { name, email, password } = req.body

    const user = await UserModel.findOne({ email });

    if (user) {
        res.status(BAD_REQUEST).send('Account exists, please login!')
        return;
    }

    const hashedPassword = await bcrypt.hash(password, PASSWORD_HASH_SALT_ROUNDS);

    const newUser = {
        name, email: email.toLowerCase(), password: hashedPassword,
    }

    const result = await UserModel.create(newUser);
    res.send(generateTokenResponse(result))

}))


const generateTokenResponse = user => {
    const token = jwt.sign({
        id: user.id, email: user.email, isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET, {
        expiresIn: '30d',
    }

);
    return {
        id: user.id, email: user.email, name: user.name, address: user.address, isAdmin: user.isAdmin, token
    };

};

export default router;