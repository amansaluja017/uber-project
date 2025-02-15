import express from 'express';
import { getCoodinates, getDistanceTime, getSuggestions } from '../controllers/map.controller.js';
import {query} from 'express-validator';
import {verifyJWT} from '../middlewares/auth.middleware.js'
const router = express.Router();

router.route('/get-coordinates/:address').get(verifyJWT, getCoodinates, 
    query('address').isString().isLength({min: 3})
)

router.route('/get-distance-time/:start/:end').get(verifyJWT, getDistanceTime, 
    query('start').isString().isLength({min: 3}),
    query('end').isString().isLength({min: 3}),
    query('travelMode').isString().isLength({min: 3})
)

router.route('/get-suggestions').get(getSuggestions)

export default router;