import express from 'express';
import {body} from 'express-validator'
import { registercaptian, logincaptian, captainProfile, logoutCaptian } from '../controllers/captian.controller.js';
import { verifyJWTCaptian } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/register').post(registercaptian, [
    body('firstName').notEmpty().withMessage('firstName is required'),
    body('email').isEmail().withMessage('email is required'),
    body('password').isLength({min: 8}).withMessage('password must be at least 8 characters'),
    body('color').isLength({min: 3}).withMessage('color is required'),
    body('vehicleType').isLength({min: 1}).withMessage('vehicle type is required'),
    body('capicity').isLength({min: 1}).withMessage('capicity must be greater than zero'),
    body('status').isLength({min: 1}).withMessage('status is required')
])

router.route('/login').post(logincaptian, [
    body('email').isEmail().withMessage('enter a valid email address'),
    body('password').isLength({min: 8}).withMessage('password must be at least 8 characters')
])

router.route('/captainProfile').get(verifyJWTCaptian, captainProfile);
router.route('/logout').get(verifyJWTCaptian, logoutCaptian)

export default router;