const express = require('express');
const app = express()

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const PORT = 80;

const APIRouter = require('./routes/routes');

app.use(APIRouter);

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

