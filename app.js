const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
require('dotenv')
    .config();

const {config, constants} = require('./configs');
const startCron = require('./cron');
const {authRouter, userRouter, carRouter} = require('./routes');
const ErrorHandler = require('./errors/ErrorHandler');
const {checkDefaultDate} = require('./util');

const app = express();

mongoose.connect(config.MONGO_CONNECT_URL);

app.use(helmet());
app.use(cors({origin: _configureCors}));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
}));

if (config.NODE_ENV === 'dev') {
    const morgan = require('morgan');

    app.use(morgan('dev'));
}

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
    checkDefaultDate();
    startCron();
});

function _configureCors(origin, callback) {
    if (config.NODE_ENV === 'dev') {
        return callback(null, true);
    }
    const whiteList = config.ALLOWED_ORIGIN.split(';');

    if (!whiteList.includes(origin)) {
        return callback(new ErrorHandler('CORS is not allowed'), false);
    }

    return callback(null, true);
}
