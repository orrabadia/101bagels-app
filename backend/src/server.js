import express from 'express';
import cors from 'cors';
import itemRouter from './routers/item.router.js';
import userRouter from './routers/user.router.js'

const app = express();

app.use(express.json());

app.use(cors({
    credentials: true,
    origin: ['http://localhost:3001']
}));

app.use('/api/items', itemRouter);
app.use('/api/users', userRouter);

const PORT = 5500;

app.listen(PORT, () => {
    console.log("Listening on Port " + PORT);
})
