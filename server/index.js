const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const router = require('./lib/router');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', router);

app.listen(PORT, console.log(`Server running on port ${PORT}`));