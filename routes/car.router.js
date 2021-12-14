const router = require('express')
    .Router();

const {carController} = require('../controllers');
const {carMiddleware} = require('../middlewares');

router.get(
    '/',
    carController.getCars);

router.post(
    '/',
    carMiddleware.isCarBodyValid,
    carController.createCar);

router.delete(
    '/:car_id',
    carMiddleware.checkCarIdMiddleware,
    carController.deleteCar);

router.get(
    '/:car_id',
    carMiddleware.checkCarIdMiddleware,
    carController.getCarById);

router.put(
    '/:car_id',
    carMiddleware.checkIsCarBodyUpdateValid,
    carMiddleware.checkCarIdMiddleware,
    carController.updateCar);

module.exports = router;
