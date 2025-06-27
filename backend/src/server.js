import express from 'express';
import cors from 'cors';
import itemRouter from './routers/item.router.js';

const app = express();

app.use(cors({
    credentials: true,
    origin: ['http://localhost:3001']
}));

app.use('/api/items', itemRouter);

const PORT = 5500;

app.listen(PORT, () => {
    console.log("Listening on Port " + PORT);
})
