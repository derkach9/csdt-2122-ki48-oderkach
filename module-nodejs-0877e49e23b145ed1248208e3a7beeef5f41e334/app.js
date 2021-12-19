const express = require('express');
const mongoose = require('mongoose');
require('dotenv')
    .config();

const {config, constants} = require('./configs');
const {authRouter, userRouter, carRouter} = require('./routes');

const app = express();

mongoose.connect(config.MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/cars', carRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || constants.INTERNAL_SERVER_ERROR)
        .json({
            message: err.message
        });
});

app.listen(config.PORT, () => {
    console.log(`App listen ${config.PORT}`);
});
