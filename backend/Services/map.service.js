import { Captian } from '../src/models/captian.model.js';
import { ApiError } from '../src/utils/ApiError.js';
import axios from 'axios';


const getAddressCoordinates = async (address) => {
    const apikey = process.env.TOMTOM_API_KEY

    try {
        const response = await axios.get(`https://api.tomtom.com/search/2/geocode/${encodeURIComponent(address)}.json`, {
            params: {
                key: apikey
            }
            
        })
        if(response.data && response.data.results.length > 0) {
            return [response.data.results[0].position, response.data.summary.query ]
        }
    } catch (error) {
        console.error("Error fetching address coordinates:", error.response? error.response.data : error.message);
        throw new ApiError(500, "Failed to fetch address coordinates");
    }
};

export const getDistanceAndTime = async(pickup, destination) => {

    const apikey = process.env.TOMTOM_API_KEY

    try {
        const response = await axios.get(`https://api.tomtom.com/routing/1/calculateRoute/${encodeURIComponent(pickup)}:${encodeURIComponent(destination)}/json`, {
            params: {
                key: apikey
                
            }
        })

        if(response.data && response.data.routes.length > 0) {
            const data = response.data.routes[0].summary;
            const distance= (data.lengthInMeters / 1000).toFixed(2);
            const duration= (data.travelTimeInSeconds / 60).toFixed(2);
            
            return {
                distance,
                duration
            }
        }
    } catch (error) {
        throw new ApiError(500, 'Failed to fetch address coordinates');
    }
}

export const getSearchSuggestins = async (input) => {

    const apikey = process.env.TOMTOM_API_KEY;

    try {
        const response = await axios.get(`https://api.tomtom.com/search/2/search/${encodeURIComponent(input)}.json`, {
            params: {
                key: apikey,
            }
        })

        const suggestions = response.data.results.map((place) => ({
            name: place.poi?.name || place.address?.freeformAddress,
            lat: place.position.lat,
            lng: place.position.lon
        }));

        return suggestions;
    } catch (error) {
        console.error("Error fetching search suggestions:", error.response? error.response.data : error.message);
        throw new ApiError(500, "Failed to fetch search suggestions");
    }
}

export const getCaptiansInTheRadius = async(lat, lng, radius) => {

    const captians = await Captian.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lat, lng], radius / 6371 ]
            }
        }
    });

    return captians;
};
   


export default getAddressCoordinates;

