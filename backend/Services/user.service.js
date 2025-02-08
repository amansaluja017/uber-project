import { User } from "../src/models/user.model.js";
import { ApiError } from "../src/utils/ApiError.js";


export const userCreate = async ({firstName, lastName, email, password, refreshToken}) => {
    if(!firstName || !email || !password) {
        throw new ApiError(401, "All fields must be required");
    }

    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        refreshToken
    })

    return user;
}