import express from 'express';
import {body} from 'express-validator'
import { registerCaption } from '../controllers/caption.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/register').post(registerCaption, [
    body('firstName').notEmpty().withMessage('firstName is required'),
    body('email').isEmail().withMessage('email is required'),
    body('password').isLength({min: 8}).withMessage('password must be at least 8 characters'),
    body('color').isLength({min: 3}).withMessage('color is required'),
    body('vehicleType').isLength({min: 1}).withMessage('vehicle type is required'),
    body('capicity').isLength({min: 1}).withMessage('capicity must be greater than zero'),
    body('status').isLength({min: 1}).withMessage('status is required')
])

export default router;