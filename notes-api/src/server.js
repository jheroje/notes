'use strict';

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import client from './db/client.js';

dotenv.config();

// Constants
const PORT = process.env.PORT || 8080;

// App initialization
const app = express();

app.use(cors());

app.get('/', (req, res) => {
    client.get('visits', (err, visits) => {
        visits = parseInt(visits) + 1;
        res.send('Number of visits is: ' + visits)
        client.set('visits', visits)
    })
});

// Now listen
app.listen(PORT, () => console.log(`Express running on port ${PORT}`));