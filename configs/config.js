module.exports = {
    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/test',
    PORT: process.env.PORT || 5000,

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'xxx',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'zzz',

    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || '11111111',
    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'email@gmail.com'

};
