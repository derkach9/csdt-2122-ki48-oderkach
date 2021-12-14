const {userNormalizator} = require('../util/user.util');
const {jwtService} = require('../service');
const {O_Auth} = require('../dataBase');

module.exports = {
    login: async (req, res, next) => {
        try {
            const {user} = req;

            const tokenPair = jwtService.generateTokenPair();

            const userNormalized = userNormalizator(user);

            await O_Auth.create({
                ...tokenPair,
                user_id: userNormalized._id
            });

            res.json({
                user: userNormalized,
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const {user, token} = req;

            await O_Auth.deleteOne({
                access_token: token
            });

            res.json(`User with email: ${user.email} successfully logout`);
        } catch (e) {
            next(e);
        }
    },

    logoutAll: async (req, res, next) => {
        try {
            const {user} = req;

            await O_Auth.deleteMany({
                user_id: user._id
            });

            res.json(`User with email: ${user.email} successfully logout`);
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const {user, token} = req;

            await O_Auth.deleteOne({
                refresh_token: token
            });

            const tokenPair = jwtService.generateTokenPair();

            const userNormalized = userNormalizator(user);

            await O_Auth.create({
                ...tokenPair,
                user_id: userNormalized._id
            });

            res.json({
                user: userNormalized,
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }
    }

};
