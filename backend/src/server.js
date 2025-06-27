import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
    credentials: true,
    origin: ['http://localhost:3002']
}));

const PORT = 5000;

app.listen(PORT, () => {
    console.log("Listening on Port " + PORT);
})
