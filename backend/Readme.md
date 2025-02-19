# User Registration API Endpoint Documentation

## Endpoint: `/users/register`

### Description
The `/users/register` endpoint is used to create a new user in the system. It accepts user details, validates the input, and returns a response indicating whether the user was successfully created.

### HTTP Method
`POST`

### Request Body
The request should be in JSON format containing the following properties:

- **firstName** (string, required):  
  Must be at least 3 characters long.

- **lastName** (string, optional):  
  If provided, must be at least 3 characters long.

- **email** (string, required):  
  Must be a valid email address.

- **password** (string, required):  
  *Note: There is a minor inconsistency where the express-validator requires at least 6 characters while the model enforces 8 characters with complexity requirements.*  
  Recommended to use a password with at least 8 characters containing one uppercase letter, one lowercase letter, one number, and one special character.

### Example Request
```json
{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "Password123!"
}
```

### Successful Response
On success, the endpoint returns a JSON response with status code 201 Created including the user details.

### Example Successful Response
```json
{
    "status": 201,
    "data": {
        "_id": "unique_user_id",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "password": "hashed_password",
        "refreshToken": null,
        "socketId": null,
        "createdAt": "2025-02-08T12:34:56.789Z",
        "updatedAt": "2025-02-08T12:34:56.789Z"
    },
    "message": "user created successfully"
}
```
### Error Response

400 Bad Request
This error occurs when required fields are missing or validation fails (e.g., first name is too short, invalid email, or insufficient password complexity).

#### Example:

```json
{
    "status": 400,
    "errors": [
        "First Name must be at least 3 characters",
        "Please enter a valid email address",
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ]
}
```

#### 500 Internal Server Error
Indicates an unexpected server error, such as issues generating tokens or saving user data.


# User Login API Endpoint Documentation

## Endpoint: `/users/login`
### Description
The `/users/login` endpoint is used for authenticating existing users. It verifies the user's credentials by checking the email and password provided. On successful authentication, it returns access and refresh tokens along with the user details.

### HTTP Method
`POST`

### Request Body
The request should be in JSON format containing the following properties:

- **email** (string, required):
Must be a valid email address.

- **password** (string, required):
Must be at least 6 characters long (as per validation middleware) and meet the required password complexity.

### Example Request
```json
{
    "email": "john.doe@example.com",
    "password": "Password123!"
}
```
### Successful Response
On success, the endpoint returns a JSON response with status code 200 OK that includes the user details, an access token, and a refresh token.

### Example Successful Response
```json
{
    "status": 200,
    "data": {
        "user": {
            "_id": "unique_user_id",
            "firstName": "John",
            "lastName": "Doe",
            "email": "john.doe@example.com",
            // other user fields
        },
        "accessToken": "generated_access_token",
        "refreshToken": "generated_refresh_token"
    },
    "message": "Logged in successfully"
}
```

### Error Responses
- ### 400 Bad Request
Occurs if the request is missing required fields (email or password).

### Example:
```json
{
    "status": 400,
    "errors": ["All fields are required"]
}
```
- ### 401 Unauthorized
Returned when the provided credentials are invalid. This can happen if the email does not exist or the password does not match.

### Example:
```json
{
    "status": 401,
    "errors": ["Invalid credentials"]
}
```
- ### 500 Internal Server Error
Indicates an unexpected error during authentication, such as issues in generating tokens.

# User profile API Endpoint Documentation
## Endpoint: ``/users/profile``
### Description
The ``/users/profile`` endpoint is used to fetch the authenticated user's profile details. It requires a valid access token (JWT) in order to access the profile information.

### HTTP Method
`GET`

### Authentication
This endpoint is protected by JWT authentication. Please include a valid JWT token with your request.

#### Successful Response
On success, the endpoint returns a JSON response with status code 200 OK containing the user's profile.

#### Example Successful Response
```json
{
    "status": 200,
    "data": {
        "_id": "unique_user_id",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        // additional user fields if any
    },
    "message": "User profile fetched successfully"
}
```
#### Error Responses
- #### 401 Unauthorized
Returned when there is no valid JWT token provided or if the token is invalid.

- #### 500 Internal Server Error
Indicates an unexpected server error while fetching the profile.
# User logout API Endpoint Documentation
## Endpoint: ``/users/logout``
### Description
The `/users/logout` endpoint is used to log out an authenticated user by clearing their refresh token and blacklisting the current access token. This helps prevent misuse of the access token after logout.

### HTTP Method
`GET`

### Authentication
This endpoint is protected by JWT authentication. Please include a valid JWT token with your request.
#### Successful Response
On success, the endpoint returns a JSON response with status code 200 OK. The user's `refreshToken` is set to null, and the current access token is stored (blacklisted) to prevent further use.

#### Example Successful Response
```json
{
    "status": 200,
    "data": {
        "_id": "unique_user_id",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "refreshToken": null
    },
    "message": "logged out successfully"
}
```
#### Error Responses
- #### 401 Unauthorized
Returned when there is no valid JWT token provided or if the token is invalid.

- #### 500 Internal Server Error
Indicates an unexpected server error during logout.

# captian Registration API Endpoint Documentation

## Endpoint: `/captian/register`

### Description
The `/captian/register` endpoint is used to create a new captian record in the system. It registers a new captian with the provided details including user information and vehicle details.

### HTTP Method
`POST`

### Request Body
The request should be in JSON format containing the following properties:

- **firstName** (string, required):  
  The first name of the captian owner. Cannot be empty.

- **lastName** (string, optional):  
  The last name of the captian owner.

- **email** (string, required):  
  A valid email address.

- **password** (string, required):  
  Password with a minimum of 8 characters.

- **vehicle** (object, required):  
  An object containing vehicle details:
  - **color** (string, required):  
    The color of the vehicle. Must be at least 3 characters long.
  - **plate** (string, required):  
    The license plate number. Must be unique.
  - **capicity** (number, required):  
    The capacity of the vehicle (must be greater than zero).
  - **vehicleType** (string, required):  
    The type of the vehicle (e.g., "car", "moterbike", "auto").

- **location** (object, optional):  
  An object with the geographical coordinates:
  - **latitude** (number):  
    The latitude value.
  - **longitude** (number):  
    The longitude value.

- **status** (string, required):  
  The current status of the captian (e.g., "active" or "inactive").

#### Example Request
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@example.com",
  "password": "StrongPass123!",
  "vehicle": {
    "color": "Red",
    "plate": "ABC1234",
    "capicity": 4,
    "vehicleType": "car"
  },
  "location": {
    "latitude": 40.7128,
    "longitude": -74.0060
  },
  "status": "active"
}
```

### Successful Response
On success, the endpoint returns a JSON response with status code `201 Created`.

#### Example Successful Response
```json
{
  "status": 201,
  "data": {
    "_id": "unique_captian_id",
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@example.com",
    "status": "active",
    "vehicle": {
      "color": "Red",
      "plate": "ABC1234",
      "capicity": 4,
      "vehicleType": "car"
    },
    "location": {
      "latitude": 40.7128,
      "longitude": -74.0060
    },
    "createdAt": "2025-02-08T12:34:56.789Z",
    "updatedAt": "2025-02-08T12:34:56.789Z"
  },
  "message": "captian created successfully"
}
```
### Error Responses
- #### 400 Bad Request
Returned when any required field is missing or if data validation fails.

#### Example:
```json
{
  "status": 400,
  "errors": [
    "firstName is required",
    "email is required",
    "password must be at least 8 characters",
    "color is required",
    "vehicle type is required",
    "capicity must be greater than zero",
    "status is required"
  ]
}
```
- #### 500 Internal Server Error
Indicates an unexpected server error while creating the captian.

## Captian Login API Endpoint

### Endpoint
`/captian/login`

### HTTP Method
`POST`

### Request Body
The request should be in JSON format containing the following properties:
- **email** (string, required): Must be a valid email address.
- **password** (string, required): Password with a minimum of 8 characters.

#### Example Request
```json
{
    "email": "john.doe@example.com",
    "password": "Password123!"
}
```

#### Successful Response
On success, the endpoint returns a JSON response with status code `200 OK`, including the captian details, an access token, and a refresh token.

#### Example Successful Response
```json
{
    "status": 200,
    "data": {
        "captian": { /* captian object */ },
        "accessToken": "access token string",
        "refreshToken": "refresh token string"
    },
    "message": "login success"
}
```
#### Error Responses
- #### 400 Bad Request:
 Returned when required fields are missing or data validation fails.
- #### 401 Unauthorized:
 Returned when the provided credentials are invalid.
- #### 500 Internal Server Error:
 Indicates an unexpected error occurred during authentication.

### Captian Profile API Endpoint
#### Endpoint
`/captian/captianProfile`

#### HTTP Method
`GET`

#### Authentication
This endpoint is protected by JWT authentication. A valid access token must be provided in the request header or via cookies.

#### Successful Response
On success, the endpoint returns a JSON response with status code 200 OK and the captian's profile details.

#### Example Successful Response
```json
{
    "status": 200,
    "data": {
        "_id": "unique_captian_id",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com"
        // additional captian fields
    },
    "message": "Captain profile fetched successfully"
}
```
#### Error Responses
- #### 401 Unauthorized:
Returned when no valid JWT token is provided or if the token is invalid.
- #### 500 Internal Server Error: Indicates an unexpected error occurred while fetching the profile.

## Captian Logout API Endpoint
### Endpoint
`/captian/logout`

### HTTP Method
`GET`

#### Authentication
This endpoint is protected by JWT authentication. A valid access token must be provided to process the logout.

#### Description
The /captian/logout endpoint logs out the captian by:

- Clearing the captian's refresh token.
- Blacklisting the current access token to prevent further use.

#### Successful Response
On success, the endpoint returns a JSON response with status code 200 OK and the updated captian object, with the refreshToken set to `null`.

#### Example Successful Response
```json
{
    "status": 200,
    "data": {
        "_id": "unique_captian_id",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "refreshToken": null
    },
    "message": "logged out successfully"
}
```
#### Error Responses
- #### 401 Unauthorized:
 Returned when no valid JWT token is provided or if the token is invalid.
- #### 500 Internal Server Error:
 Indicates an unexpected error occurred during logout.

# Map API Endpoints

These endpoints provide geolocation functionalities: fetching coordinates for an address, calculating route distance and duration between two points, and retrieving location suggestions based on a search input. All endpoints require a valid JWT token.

---

### GET `/get-coordinates/:address`

- **Description:**  
  Fetches the geographical coordinates (latitude and longitude) for the specified address using the TomTom geocoding service.

- **URL Parameters:**  
  - `address` (string, required): The address to geocode. Must be at least 3 characters.

- **Authentication:**  
  This endpoint is protected by JWT.

- **Response Example (200 OK):**
  ```json
  {
      "status": 200,
      "data": {
          "lat": 12.9716,
          "lon": 77.5946
      },
      "message": "Coodinates fetched successfully"
  }
  ```
- **Error Responses:**
- ***400 Bad Request:*** Missing or invalid address.
- ***500 Internal Server Error:*** Error in fetching coordinates.
#### GET `/get-distance-time/:start/:end`
- **Description:**
Calculates the route between two locations and returns the distance and estimated travel time. This endpoint leverages the TomTom routing API.

- **URL Parameters:**

`start` (string, required): Starting location (as a coordinate or address string). Must be at least 3 characters.
`end` (string, required): Destination location (as a coordinate or address string). Must be at least 3 characters.
- **Authentication:**
This endpoint is protected by JWT.

- **Response Example (200 OK):**
```json
{
    "status": 200,
    "data": {
        "distance": "12.34 km",
        "duration": "23.45 mins"
    },
    "message": "distance and duration fetched successfully"
}
```
- **Error Responses:**

- ***400 Bad Request:*** Missing or invalid parameters.
- ***500 Internal Server Error:*** Error in retrieving distance and time.
#### GET `/get-suggestions`
- #### Description:
Returns location suggestions based on a search input. It uses the TomTom search API.

- #### Query Parameters:

`input` (string, required): The search string for location suggestions.
- #### Authentication:
This endpoint is protected by JWT.

- #### Response Example (200 OK):
```json
{
    "status": 200,
    "data": [
        {
            "name": "Place Name 1",
            "lat": 12.9716,
            "lng": 77.5946
        },
        {
            "name": "Place Name 2",
            "lat": 12.9720,
            "lng": 77.5950
        }
    ],
    "message": "Suggestions fetched successfully"
}
```
- #### Error Responses:

- ***400 Bad Request:*** Missing or invalid input.
- ***500 Internal Server Error:*** Error in fetching suggestions.
## Ride API Endpoints

These endpoints allow users to create new rides and retrieve ride fare estimates. All endpoints are protected by JWT authentication where indicated.

---

### POST `/api/v1/rides/create`

- **Description:**  
  Creates a new ride using the provided pickup location, destination, and vehicle type. The endpoint calculates the ride fare based on distance and duration using the TomTom routing API.

- **Authentication:**  
  This endpoint is protected by JWT. A valid token must be provided in the request header or cookies.

- **Request Body:**  
  The request should be in JSON format:
  ```json
  {
      "start": "Pickup address or coordinate string",
      "end": "Destination address or coordinate string",
      "vehicleType": "auto | car | motorbike"
  }
  ```
 - #### Response Example (201 Created):
 ```json
 {
    "status": 201,
    "data": {
        "_id": "unique_ride_id",
        "user": "user_id",
        "start": "Pickup address or coordinates",
        "end": "Destination address or coordinates",
        "fare": 123.45,
        "distance": "12.34",    // calculated distance in km
        "duration": "23.45",    // calculated duration in minutes
        "otp": "123456",
        "createdAt": "2025-02-08T12:34:56.789Z"
    },
    "message": "ride created successfully"
}
```
- #### Error Responses:

- #### 400 Bad Request:
Returned when required fields are missing or data validation fails.
- #### 401 Unauthorized:
Returned when the JWT token is missing or invalid.
- #### 500 Internal Server Error:
Indicates an error occurred while creating the ride or calculating fare.

### GET `/api/v1/rides/get-price`
- #### Description:
Retrieves the fare estimate for a ride based on the provided pickup and destination coordinates. The fare is calculated with predefined base fares, per kilometer rates, and per minute rates for different vehicle types.

- #### Authentication:
Although not explicitly protected by JWT in the route definition, ensure proper access as per your application requirements.

- #### Query Parameters:

`start` (string, required):
The starting location (address or coordinate). Must be at least 1 character.
`end` (string, required):
The destination location. Must be at least 3 characters.
- #### Response Example (200 OK):
```json
{
    "status": 200,
    "data": {
        "auto": 45.67,
        "car": 78.90,
        "motorbike": 34.56
    },
    "message": "fare fetched successfully"
}
```
- #### Error Responses:

- #### 400 Bad Request:
Returned when required query parameters are missing or invalid.
- #### 500 Internal Server Error:
Indicates an error occurred while calculating the fare.

## Ride Confirmation API Endpoint Documentation

### Endpoint: `/confirm`

#### Description
The `/confirm` endpoint is used by captains to confirm a ride. It requires a valid JWT token for authentication.

#### HTTP Method
`POST`

#### Request Body
The request should be in JSON format containing the following property:
- **rideId** (string, required): The ID of the ride to be confirmed.

#### Example Request
```json
{
    "rideId": "unique_ride_id"
}
```

#### Successful Response
On success, the endpoint returns a JSON response with status code 200 OK including the ride details.

#### Example Successful Response
```json
{
    "status": 200,
    "data": {
        "_id": "unique_ride_id",
        "user": "user_id",
        "captain": "captain_id",
        // other ride details
    },
    "message": "Ride confirmed successfully"
}
```

#### Error Responses
- **400 Bad Request:** Returned when required fields are missing or validation fails.
- **401 Unauthorized:** Returned when the JWT token is missing or invalid.
- **500 Internal Server Error:** Indicates an unexpected server error during ride confirmation.

## Ride Start API Endpoint Documentation

### Endpoint: `/start-ride`

#### Description
The `/start-ride` endpoint is used by captains to start a ride. It requires a valid JWT token for authentication.

#### HTTP Method
`GET`

#### Query Parameters
The request should include the following query parameters:
- **rideId** (string, required): The ID of the ride to be started.
- **otp** (string, required): The OTP for starting the ride.

#### Example Request
```
GET /start-ride?rideId=unique_ride_id&otp=123456
```

#### Successful Response
On success, the endpoint returns a JSON response with status code 200 OK including the ride details.

#### Example Successful Response
```json
{
    "status": 200,
    "data": {
        "_id": "unique_ride_id",
        "user": "user_id",
        "captain": "captain_id",
        // other ride details
    },
    "message": "Ride started successfully"
}
```

#### Error Responses
- **400 Bad Request:** Returned when required fields are missing or validation fails.
- **401 Unauthorized:** Returned when the JWT token is missing or invalid.
- **500 Internal Server Error:** Indicates an unexpected server error during ride start.

## Ride End API Endpoint Documentation

### Endpoint: `/api/v1/rides/end-ride`
- **Description:** Ends an active ride.
- **HTTP Method:** `POST`
- **Authentication:** JWT required.
- **Request Body:** JSON including:
  - `rideId` (string, required, valid MongoDB ID)
- **Successful Response:** 200 OK with confirmation message.
- **Error Responses:**
  - 400 Bad Request: when rideId is missing/invalid.
  - 401 Unauthorized: when JWT is missing or invalid.
  - 500 Internal Server Error: on server failure.

## Socket.io API Documentation

### Overview
This section documents the real-time communication using Socket.io.

### Key Events
- **connection:** Triggered when a client connects.
- **join:** Clients emit with `userId` and `userType` to register their socket.
- **update-location-captian:** Captains emit their updated location (latitude and longitude).
- **disconnect:** Triggered when a client disconnects.
- **sendMessagetoSocketId:** Server helper to send events with data to a specific socket.

# Payment API Endpoints Documentation

## Create Payment Endpoint

### Endpoint: `/create-payment`

#### Description
Creates a new payment order using the Razorpay payment gateway.

#### HTTP Method
`POST`

#### Authentication
This endpoint is protected by JWT authentication. A valid token must be provided.

#### Request Body
The request should be in JSON format containing:

- **amount** (number, required):  
  The payment amount in the smallest currency unit (e.g., paise for INR)

- **currency** (string, optional):  
  The currency code (defaults to INR)

- **receipt** (string, optional):  
  A unique identifier for the order

#### Example Request
```json
{
    "amount": 1000,
    "currency": "INR",
    "receipt": "order_123"
}
```

#### Successful Response
```json
{
    "status": 200,
    "data": {
        "id": "order_123456789",
        "entity": "order",
        "amount": 1000,
        "amount_paid": 0,
        "currency": "INR",
        "receipt": "order_123",
        "status": "created"
    },
    "message": "Payment order created successfully"
}
```

#### Error Responses
- **400 Bad Request:**
```json
{
    "status": 400,
    "message": "Amount is required"
}
```
- **500 Internal Server Error:**
```json
{
    "status": 500,
    "message": "Payment creation failed"
}
```

## Verify Payment Endpoint

### Endpoint: `/verify-payment`

#### Description
Verifies a completed payment using Razorpay's signature verification.

#### HTTP Method
`POST`

#### Authentication
This endpoint is protected by JWT authentication.

#### Request Body
The request should be in JSON format containing:

- **rideId** (string, required):  
  MongoDB ID of the associated ride

- **paymentId** (string, required):  
  Razorpay payment ID

- **orderId** (string, required):  
  Razorpay order ID

- **signature** (string, required):  
  Razorpay generated signature

#### Example Request
```json
{
    "rideId": "65bf12345678901234567890",
    "paymentId": "pay_123456789",
    "orderId": "order_123456789",
    "signature": "generated_signature_string"
}
```

#### Successful Response
```json
{
    "status": 200,
    "data": {
        "paymentVerify": {
            "paymentId": "pay_123456789",
            "orderId": "order_123456789",
            "signature": "generated_signature_string"
        },
        "ride": {
            // ride details
        }
    },
    "message": "Payment verified successfully"
}
```

#### Error Responses
- **400 Bad Request:**
```json
{
    "status": 400,
    "message": "All fields are required"
}
```
- **400 Bad Request:**
```json
{
    "status": 400,
    "message": "Invalid signature"
}
```
- **500 Internal Server Error:**
```json
{
    "status": 500,
    "message": "Internal server error: Failed to verify payment"
}
```
