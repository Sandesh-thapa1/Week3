import express from 'express';
import cors from 'cors';

import {notFoundHandler, errorHandler} from './middlewares/error-handlers.js';

import api from './api/index.js';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/v1', api);

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
