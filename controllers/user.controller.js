const {User, O_Auth} = require('../dataBase');
const {passwordService,emailService} = require('../service');
const userUtil = require('../util/user.util');
const {emailActionsEnum} = require('../configs');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await User.find()
                .lean();

            const normalizedUser = users.map(value => userUtil.userNormalizator(value));

            res.json(normalizedUser);
        } catch (err) {
            next(err);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const user = req.user;

            const normalizedUser = userUtil.userNormalizator(user.toObject());

            res.json(normalizedUser);
        } catch (err) {
            next(err);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const {password, name} = req.body;

            const hashedPassword = await passwordService.hash(password);

            await emailService.sendMail(req.body.email, emailActionsEnum.WELCOME, {userName: name});

            const newUser = await User.create({...req.body, password: hashedPassword});

            const normalizedUser = userUtil.userNormalizator(newUser.toObject());

            res.json(normalizedUser);
        } catch (err) {
            next(err);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            await O_Auth.deleteMany({user_id});

            await User.deleteOne({_id: user_id});

            await emailService.sendMail(req.body.email, emailActionsEnum.DELETE);

            res.json(`User with id: ${user_id} deleted`);
        } catch (err) {
            next(err);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const newUser = await User.findByIdAndUpdate(user_id, req.body, {new: true})
                .lean();

            await emailService.sendMail(newUser.email, emailActionsEnum.UPDATE,{userName:newUser.name});

            const normalizedUser = userUtil.userNormalizator(newUser);

            res.json(normalizedUser);
        } catch (err) {
            next(err);
        }
    },
};
