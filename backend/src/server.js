import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import cors from 'cors';
import itemRouter from './routers/item.router.js';
import userRouter from './routers/user.router.js'
import orderRouter from './routers/order.router.js'
import { dbconnect } from './config/database.config.js';

dbconnect();

const app = express();

app.use(express.json());

app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002']
}));

app.use('/api/items', itemRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter)

const PORT = 5500;

app.listen(PORT, () => {
    console.log("Listening on Port " + PORT);
})
