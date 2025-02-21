# Uber Clone Project

A full-stack Uber clone application with real-time tracking, authentication, and payment integration.

## Features

- User authentication (Riders and Drivers)
- Real-time location tracking
- Ride booking and management
- Payment integration with Razorpay
- Route calculation and fare estimation

## Tech Stack

### Frontend
- React.js
- Redux for state management
- Socket.io-client for real-time communication
- TomTom Maps API for location services
- Tailwind CSS for styling

### Backend
- Node.js with Express
- MongoDB for database
- Socket.io for real-time features
- JWT for authentication
- Cloudinary for image storage
- Razorpay payment integration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Cloudinary account
- Razorpay test account
- TomTom API key

## Environment Variables

### Backend
```env
PORT=3000
CORS_ORIGIN=http://localhost:5173
DB_CONNECT=your_mongodb_connection_string
DB_NAME=uber
SECRET_ACCESS_TOKEN=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1D
SECRET_REFRESH_TOKEN=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=7D
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_API_KEY=your_cloudinary_secret
CLOUD_NAME=your_cloudinary_name
TOMTOM_API_KEY=your_tomtom_api_key
ROZARPAY_TEST_API_KEY=your_razorpay_key
ROZARPAY_TEST_API_KEY_SECRET=your_razorpay_secret
```

## Installation

1. Clone the repository
```bash
git clone https://github.com/amansaluja017/uber-project.git
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd frontend
npm install
```

4. Start the development servers

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm run dev
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - User login

### User
- GET `/api/users/profile` - Get user profile

### Rides
- POST `/api/rides/get-price` - Calculate ride fare
- POST `/api/rides/create` - Create a ride
- POST `/api/rides/cancel-ride` - Cancel ride
- POST `/api/rides/end-ride` - Complete ride

### Payments
- POST `/api/payments/create-order` - Create payment order
- POST `/api/payments/verify` - Verify payment

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- TomTom Maps API for location services
- Razorpay for payment integration
- Socket.io for real-time features
