const router = require('express')
    .Router();

const {authController} = require('../controllers');
const {userMiddleware, authMiddleware} = require('../middlewares');

router.post(
    '/',
    authMiddleware.isUserAuthValid,
    userMiddleware.isUserPresent,
    authMiddleware.isPasswordMatched,
    authController.login
);

router.post(
    '/logout',
    authMiddleware.checkAccessToken,
    authController.logout
);

router.post(
    '/logout-all',
    authMiddleware.checkAccessToken,
    authController.logoutAll
);

router.post(
    '/refresh',
    authMiddleware.checkRefreshToken,
    authController.refresh
);

router.post(
    '/password/forgot',
    authController.sendMailForgotPassword);

router.put(
    '/password/forgot',
    authMiddleware.isUserForgotPassValid,
    authMiddleware.checkActionToken,
    authController.setNewPasswordAfterForgot);

router.get(
    '/activate/:token',
    authMiddleware.checkActivateToken,
    authController.activate);

module.exports = router;
