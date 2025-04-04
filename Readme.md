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

### Frontend
```env
VITE_TOMTOM_API_KEY=your_tomtom_api_key
VITE_ROZARPAY_TEST_API_KEY=your_razorpay_key
VITE_BASE_URL=your_api_base_url
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

## New Features

### Captain Rating & Points System
- Rating system for drivers (1-5 stars)
- Points calculation based on average ratings (20 points per rating star)
- Progress indicators with color coding:
  - Green: 80+ points
  - Orange: 50-79 points
  - Yellow: 30-49 points
  - Red: 0-29 points

### Captain Dashboard
- Real-time earnings tracking
- Ride history management
- Active/Inactive status toggle
- Performance metrics display

### Enhanced Ride Management
- OTP verification for ride start
- Real-time chat between user and captain
- Detailed ride information panels
- Ride cancellation with notifications

### Payment Enhancements
- Integrated Razorpay payment flow
- Payment status tracking
- Success/failure notifications
- Automatic earnings calculation

### Real-time Features
- Live location tracking
- Instant ride status updates
- Distance calculation
- ETA updates

### User Experience Improvements
- Animated panels using GSAP
- Responsive design for all screens
- Improved map integration
- Better error handling and feedback

## New Features & Enhancements

### Real-time Chat System
- Integrated chat system between users and captains
- Real-time message delivery using Socket.io
- Chat history preservation during active rides
- Unread message notifications
- User-friendly chat interface with timestamps

### Enhanced Captain Profile System
- Dynamic rating display (0-5 stars)
- Progress points system with visual indicators
  - Green (80+ points): Excellent performance
  - Orange (50-79 points): Good performance
  - Yellow (30-49 points): Average performance
  - Red (0-29 points): Needs improvement
- Real-time earnings tracker
- Status toggle for availability (active/inactive)
- Detailed ride history with earnings breakdown

### Advanced Ride Management
- OTP verification system for ride initiation
- Step-by-step ride progress tracking
- Multiple ride panels:
  - Ride confirmation panel
  - Looking for driver panel
  - Active ride panel
  - Payment panel
- GSAP animations for smooth transitions between panels

### Enhanced Payment System
- Seamless Razorpay integration
- Multiple payment method support
- Real-time payment status updates
- Payment verification system
- Automatic earnings calculation for captains
- Payment success/failure notifications

### Location & Navigation Improvements
- Real-time location tracking using TomTom Maps
- Dynamic route calculation
- Distance and ETA updates
- Fare calculation based on:
  - Distance
  - Vehicle type
  - Time of day
  - Demand factors

### UI/UX Improvements
- Responsive design for all screen sizes
- Animated transitions using GSAP
- Sliding panels for information display
- Toast notifications for important updates
- Loading indicators for async operations
- Error handling with user-friendly messages

### Vehicle Management
- Support for multiple vehicle types:
  - Cars
  - Auto-rickshaws
  - Motorbikes
- Vehicle-specific fare calculation
- Capacity management
- Vehicle details verification

### Socket Events Documentation
```javascript
// User events
socket.on("receive-location", (coordinates) => {
  // Real-time location updates
});

socket.on("rideEnded", (rideDetails) => {
  // Ride completion handling
});

// Captain events
socket.on("ride-request", (rideDetails) => {
  // New ride request handling
});

socket.on("payment-verified", (paymentDetails) => {
  // Payment confirmation handling
});

// Chat events
socket.on("user-message", (message) => {
  // Handle user messages
});

socket.on("captain-message", (message) => {
  // Handle captain messages
});
```

## Additional API Endpoints

### Captain Management
- GET `/api/v1/captian/captian-points` - Get captain's rating points
- GET `/api/v1/captian/captian-earnings` - Get captain's total earnings
- GET `/api/v1/captian/rideHistory` - Get captain's ride history
- POST `/api/v1/captian/update-status` - Update captain's availability status

### Ride Rating
- POST `/api/v1/rides/ride-rating` - Submit ride rating
- GET `/api/v1/rides/get-rating` - Get ride rating

### Socket Events
- `receive-location` - Real-time location updates
- `rideEnded` - Ride completion notification
- `payment-verified` - Payment confirmation
- `rideCancelled` - Ride cancellation notification

## Upcoming Features
- Multi-language support
- Dark mode
- Ride scheduling
- Favorite locations
- Ride sharing
- Advanced analytics dashboard
- Driver performance metrics
- Customer loyalty program

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
