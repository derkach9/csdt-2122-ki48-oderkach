const {Car} = require('../dataBase');

module.exports = {
    createCar: async (req, res, next) => {
        try {
            const newCar = await Car.create(req.body);

            res.json(newCar);
        } catch (err) {
            next(err);
        }
    },

    getCarById: (req, res, next) => {
        try {
            res.json(req.car);
        } catch (err) {
            next(err);
        }
    },

    getCars: async (req, res, next) => {
        try {
            const users = await Car.find();

            res.json(users);
        } catch (err) {
            next(err);
        }
    },

    deleteCar: async (req, res, next) => {
        try {
            const {car_id} = req.params;

            await Car.deleteOne({_id: car_id});

            res.json(`Car with id: ${car_id} deleted`);
        } catch (err) {
            next(err);
        }
    },

    updateCar: async (req, res, next) => {
        try {
            const {car_id} = req.params;

            const newCar = await Car.findByIdAndUpdate(car_id, req.body, {new: true});

            res.json(newCar);
        } catch (err) {
            next(err);
        }
    }
};
