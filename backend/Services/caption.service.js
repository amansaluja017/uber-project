import {Caption} from '../src/models/caption.model.js'
import { ApiError } from '../src/utils/ApiError.js'

export const createCaption = async function({firstName, lastName, email, password, status, color, plate, capicity, vehicleType}) {
    // if(!firstName || !email || !password || !status || !color || !plate || !capicity || !vehcileType) {
    //     throw new ApiError(401, 'All fields are required')
    // }

    const caption = await Caption.create({
        firstName,
        lastName,
        email,
        password,
        status,
        vehicle: {
            color,
            plate,
            capicity,
            vehicleType
        }
    })

    if(!caption) {
        throw new ApiError(500, 'Failed to create caption')
    }

    return caption;
}