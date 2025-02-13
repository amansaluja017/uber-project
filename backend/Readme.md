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
#### GET `/get-distance-time/:start/:end/:travelMode`
- **Description:**
Calculates the route between two locations and returns the distance and estimated travel time. This endpoint leverages the TomTom routing API.

- **URL Parameters:**

`start` (string, required): Starting location (as a coordinate or address string). Must be at least 3 characters.
`end` (string, required): Destination location (as a coordinate or address string). Must be at least 3 characters.
`travelMode` (string, required): The mode of travel (e.g., “driving”, “walking”, etc.). Must be at least 3 characters.
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