import { Ride } from "../src/models/ride.model.js";
import {ApiError} from '../src/utils/ApiError.js';
import { getDistanceAndTime } from "./map.service.js";
import crypto from 'crypto'

export async function getFare(start, end ) {
    if(!start || !end) {
        throw new ApiError(401, "You must provide pickup and destination");
    }

    const distanceTime =  await getDistanceAndTime(start, end);

    const baseFare = {
        auto: 30,
        car: 50,
        motorbike: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        motorbike: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        motorbike: 1.5
    };

    const fare = {
        auto: Number((baseFare.auto + (distanceTime.distance * perKmRate.auto) + (distanceTime.duration * perMinuteRate.auto)).toFixed(2)),
        car: Number((baseFare.car + (distanceTime.distance * perKmRate.car) + (distanceTime.duration * perMinuteRate.car)).toFixed(2)),
        motorbike: Number((baseFare.motorbike + (distanceTime.distance * perKmRate.motorbike) + (distanceTime.duration * perMinuteRate.motorbike)).toFixed(2))
    }
    return fare;
};

const getOtp = (num) => {
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
    return otp;
}

export const createNewRide = async ({user, start, end, vehicleType}) => {

    const fare = await getFare(start, end);
    if(!fare) {
        throw new ApiError(500, "internal server error: Could not find fare")
    }

    const distanceTime = await getDistanceAndTime(start, end);

    if(!distanceTime) {
        throw new ApiError(500, "internal server error: Could not find distance and time")
    }

    const ride = Ride.create({
        user,
        start,
        end,
        fare: fare[vehicleType],
        distance: distanceTime.distance,
        duration: distanceTime.duration,
        otp: getOtp(6)
    })

    return ride;
};
