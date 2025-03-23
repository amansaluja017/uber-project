import {Captian} from '../src/models/captian.model.js'
import { ApiError } from '../src/utils/ApiError.js'

export const createCaptian = async function({firstName, lastName, email, password, color, plate, capicity, vehicleType}) {

    const captian = await Captian.create({
        firstName,
        lastName,
        email,
        password,
        vehicle: {
            color,
            plate,
            capicity,
            vehicleType
        }
    })

    if(!captian) {
        throw new ApiError(500, 'Failed to create captian')
    }

    return captian;
}