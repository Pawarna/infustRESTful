import express from 'express';
import cors from 'cors';        
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import { requestLogger } from './middlewares/loggerMiddleware.js';
import {router} from './routes/index.js';
const app = express();

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(requestLogger);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/api', router);

app.use(errorMiddleware);

export {
    app
}