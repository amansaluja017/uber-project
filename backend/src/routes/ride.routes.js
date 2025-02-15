import express from 'express';
import {body, query} from 'express-validator'
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { createRide, getPrice } from '../controllers/ride.controller.js';

const router = express.Router();

router.route('/create').post(verifyJWT, createRide, 
    body('start').isString().isLength({min: 1}).withMessage('Invalid pickup address'),
    body('end').isString().isLength({min: 3}).withMessage('Invalid destination address'),
    body('vehicleType').isString().isLength({min: 1}).withMessage('Invalid vehicle type'),
)

router.route('/get-price').get(getPrice,
    query('start').isString().isLength({min: 1}).withMessage('Invalid vehicle start'),
    query('end').isString().isLength({min: 3}).withMessage('Invalid vehicle end')
);

export default router;