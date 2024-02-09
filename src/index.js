const express = require('express');
const app = express();

const connect = require('./config/database');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const apiRoutes = require('./routers/index');
app.use('/api', apiRoutes);

app.listen(3000, async () => {
    console.log('Server Started on PORT 3000');
    await connect();
    console.log('Mongodb Connected');
});