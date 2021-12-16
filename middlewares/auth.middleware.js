const {userValidator} = require('../validators');
const ErrorHandler = require('../errors/ErrorHandler');
const {constants, tokenTypeEnum} = require('../configs');
const {jwtService, passwordService} = require('../service');
const {O_Auth} = require('../dataBase');

module.exports = {
    isUserAuthValid: (req, res, next) => {
        try {
            const {error, value} = userValidator.authUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, constants.BAD_REQUEST);
            }

            req.body = value;

            next();
        } catch (err) {
            next(err);
        }
    },

    isPasswordMatched: async (req, res, next) => {
        try {
            const {password} = req.body;
            const {password: hashPassword} = req.user;

            await passwordService.compare(password, hashPassword);

            next();
        } catch (err) {
            next(err);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(constants.INVALID_TOKEN, constants.UNAUTHORIZED);
            }

            await jwtService.verifyToken(token);

            const tokenResponse = await O_Auth
                .findOne({accessToken: token})
                .populate('user_id');

            if (!tokenResponse) {
                throw new ErrorHandler(constants.INVALID_TOKEN, constants.UNAUTHORIZED);
            }

            req.user = tokenResponse.user_id;
            req.token = token;

            next();
        } catch (err) {
            next(err);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(constants.INVALID_TOKEN, constants.UNAUTHORIZED);
            }

            await jwtService.verifyToken(token, tokenTypeEnum.REFRESH);

            const tokenResponse = await O_Auth
                .findOne({refresh_token: token})
                .populate('user_id');

            if (!tokenResponse) {
                throw new ErrorHandler(constants.INVALID_TOKEN, constants.UNAUTHORIZED);
            }

            req.user = tokenResponse.user_id;
            req.token = token;

            next();
        } catch (err) {
            next(err);
        }
    }

};
