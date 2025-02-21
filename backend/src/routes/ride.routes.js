import express from 'express';
import {body, query} from 'express-validator'
import { verifyJWT, verifyJWTCaptian } from '../middlewares/auth.middleware.js';
import { cancelRide, confirmRide, createRide, endRide, getPrice, startRide } from '../controllers/ride.controller.js';

const router = express.Router();

router.route('/create').post(verifyJWT, createRide, 
    body('start').isString().isLength({min: 1}).withMessage('Invalid pickup address'),
    body('end').isString().isLength({min: 3}).withMessage('Invalid destination address'),
    body('vehicleType').isString().isLength({min: 1}).withMessage('Invalid vehicle type'),
);

router.route('/get-price').get(getPrice,
    query('start').isString().isLength({min: 1}).withMessage('Invalid vehicle start'),
    query('end').isString().isLength({min: 3}).withMessage('Invalid vehicle end')
);

router.route('/confirm').post(verifyJWTCaptian, confirmRide, 
    body('rideId').isLength({min: 1}).withMessage('Invalid ride ID')
);

router.route('/start-ride').get(verifyJWTCaptian, startRide,
    query('otp').isLength({min: 6}).withMessage('Invalid OTP'),
    query('rideId').isLength({min: 1}).withMessage('Invalid ride ID')
);

router.route('/end-ride').post(verifyJWTCaptian, endRide,
    body('rideId').isLength({min: 1}).isMongoId().withMessage('Invalid ride id')
);

router.route('/cancel-ride').post(verifyJWTCaptian, cancelRide,
    body('rideId').isLength({min: 1}).isMongoId().withMessage('Invalid ride id')
);

export default router;