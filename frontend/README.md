# Frontend Documentation

## Project Overview
This project is a ride-sharing application built with React, Redux, and React Router. The platform allows regular users to sign up and log in, while also providing a dedicated interface for captains (drivers) to manage their login and registration. The application is designed to provide a seamless user experience with a modern, responsive UI.

## Routes

### Route: `/`
- **Description**:  
  The landing page of the application. It serves as a welcome screen where users are introduced to the service. This page uses the `WelcomeComponent` to display a background image, logo, and a prompt to continue to the login page.
- **Method**: GET (renders on browser navigation)
- **Component**: `Weclcome` (renders `WelcomeComponent`)

---

### Route: `/login`
- **Description**:  
  The user login page where existing users can enter their credentials to log in. The form validates input (email and password) before dispatching a login action.
- **Method**: GET (renders on browser navigation)
- **Component**: `UserLogin`
- **Navigation Options**:  
  Provides a link to the signup page (`/signup`) for new users and a link to captain login (`/captian-login`) for captains.

---

### Route: `/captian-login`
- **Description**:  
  The captain login page dedicated to drivers. This page provides a form for captains to enter their email and password, which triggers a login action specifically for captains.
- **Method**: GET (renders on browser navigation)
- **Component**: `CaptianLogin`
- **Navigation Options**:  
  Includes a link to captain registration (`/captian-signup`) if the user doesn't have an account, and a link to the user login page (`/login`).

---

### Route: `/signup`
- **Description**:  
  The user signup page allows new regular users to create an account. The page presents a form that collects the user's first name, last name, email, and password.
- **Method**: GET (renders on browser navigation)
- **Component**: `UserSignup`
- **Form Details**:
  - **firstName**: Text input (required)
  - **lastName**: Text input (optional)
  - **email**: Email input (required)
  - **password**: Password input (required)
- **Navigation Options**:  
  Upon successful signup, users are redirected to the `/login` page. There is also a link provided for users who already have an account.

---

### Route: `/captian-signup`
- **Description**:  
  The captian signup page allows new captains (drivers) to register. This page provides a signup form where captains can enter their details including first name, last name, email, and password.
- **Method**: GET (renders on browser navigation)
- **Component**: `CaptianSignup`
- **Form Details**:
  - **firstName**: Text input (required)
  - **lastName**: Text input (optional)
  - **email**: Email input (required)
  - **password**: Password input (required)
- **Navigation Options**:  
  After a successful signup, captains are redirected to the `/captian-login` page. A link is provided for captains who already have an account.

### Route: `/logout`
- **Description**:  
  The user logout page logs out the current user. It sends a GET request to the backend at `/api/v1/users/logout` to clear the user's refresh token and blacklist the access token.  
- **Method**: GET  
- **Component**: `UserLogout`  
- **Flow/Navigation**:  
  1. User triggers logout.  
  2. The request is sent with the stored access token in the request header.  
  3. On success (HTTP 200), the token is removed from localStorage and the user is redirected to `/login`.

---

### Route: `/captian-logout`
- **Description**:  
  The captian logout page logs out a logged-in captian (driver). It makes a GET request to the backend at `/api/v1/captian/logout` to process logout by clearing the refresh token and blacklisting the access token.  
- **Method**: GET  
- **Component**: `CaptianLogout`  
- **Flow/Navigation**:  
  1. Captian initiates a logout action.  
  2. A GET request is sent with the access token in the header.  
  3. On a successful response (HTTP 200), the token is removed from localStorage and the captian is redirected to `/captian-login`.

## Protected Routes

### User Protected Routes

#### `/home` Route
- **Description:**  
  The home route displays the main dashboard for a logged-in user. This route is protected by the `UserProtected` component, which ensures that only authenticated users can access it.
- **Method:** GET (renders on browser navigation)
- **Component:** `Home` wrapped with `UserProtected`
- **Access Flow:**  
  - If `state.user.status` is true, the user sees the Home page.
  - If not authenticated, the user is redirected to `/login`.
- **Features:**
  - **Map View:** Displays a map with the user's current location.
  - **Trip Search:** Allows users to search for trips by entering pickup and destination locations.
  - **Vehicle Selection:** Users can select a vehicle type and view fare estimates.
  - **Ride Confirmation:** Users can confirm a ride and view driver details once a driver is assigned.

#### UserProtected Component
- **Description:**  
  Wraps user-specific routes to protect them from being accessed by unauthenticated users.  
- **Behavior:**  
  - Checks the value of `state.user.status` from the Redux store.
  - If `status` is not true, it redirects the user to `/login`.
  - It renders a loading indicator until the authentication status is determined.
- **Usage:**  
  Wrap any route or component that should be accessible only by logged-in users.

---

### Captian Protected Routes

#### `/captian-home` Route
- **Description:**  
  The captain home route displays the dashboard for a logged-in captain (driver). It is wrapped with the `CaptianProtected` component to ensure that only authenticated captains can access it.
- **Method:**  
  GET (renders on browser navigation)
- **Component:**  
  `CaptianHome`
- **Access Flow:**  
  - If the Redux store’s `state.captian.status` is true, the captain is allowed to view the homepage.
  - If not authenticated, the captain is redirected to `/captian-login`.
- **Features:**
  - **Map View:** Displays a map with the captain's current location.
  - **Ride Requests:** Captains can view and accept ride requests.
  - **Ride Details:** Captains can view ride details and confirm rides.
  - **Location Updates:** Captains' locations are updated in real-time.

#### CaptianProtected Component
- **Description:**  
  Secures routes that require captain (driver) authentication.
- **Behavior:**  
  - Monitors `state.captian.status` from the Redux store.
  - Redirects an unauthenticated captain to `/captian-login`.
  - Displays a loading indicator until the captain’s authentication status is determined.
- **Usage:**  
  Wrap any captain-specific routes or components that require authentication.

---

#### `/captian-riding` Route
- **Description:**  
  This route provides the in-ride interface for the captain. It displays a live map, ride details, and controls to complete a ride. The page is designed specifically for managing the ongoing ride process.
- **Method:**  
  GET (renders on browser navigation)
- **Component:**  
  `CaptianRide`
- **Interface Features:**  
  - **Map and Ride Details:**  
    A map view is displayed with ride-related data (pickup location, destination, distance, etc.).
  - **Navigation:**  
    The page provides navigation controls (like a home button that routes back to `/captian-home` or logout).
  - **Ride Completion:**  
    A button allows the captain to trigger a complete ride action which opens a panel that wraps the `FinishRide` component.
- **Usage:**  
  This page is accessed when a captain accepts a ride. It provides drivers with the necessary UI to view route information and to conclude the ride once it is complete.

---

### Route: `/riding`
- **Description:**  
  The riding route displays the current ride details for the user. This page shows the ride status, driver details, and fare information.
- **Method:** GET (renders on browser navigation)
- **Component:** `Riding`
- **Features:**
  - **Driver Details:** Displays the driver's name, vehicle details, and contact information.
  - **Ride Route:** Shows the pickup and destination locations.
  - **Fare Information:** Displays the fare amount and payment method.
  - **Payment Button:** Allows users to make a payment for the ride.

### Route: `/payment`
- **Description:**  
  The payment route handles the payment processing for completed rides using Razorpay integration.
- **Method:** GET (renders on browser navigation)
- **Component:** `Payment` (renders `RazorpayPayment`)
- **Features:**
  - Displays the total fare amount
  - Integrates with Razorpay payment gateway
  - Shows payment status notifications
  - Automatically redirects to home page after successful payment

## Payment Integration

### Razorpay Integration
The application uses Razorpay for payment processing. The integration is handled through the `RazorpayPayment` component.

#### Payment Flow
1. **Payment Initialization**
   - When user clicks "Pay Now", the application creates a Razorpay order
   - Makes a POST request to `/api/v1/payments/create-payment`
   - Requires amount, currency, and receipt details

2. **Payment Processing**
   - Opens Razorpay payment modal
   - Handles payment through Razorpay's secure interface
   - Supports multiple payment methods (cards, UPI, wallets)

3. **Payment Verification**
   - After successful payment, verifies the transaction
   - Makes a POST request to `/api/v1/payments/verify-payment`
   - Validates payment signature and order details

4. **Success/Failure Handling**
   - Shows success/failure notifications using toast messages
   - Redirects to home page on successful payment
   - Provides retry option on payment failure

#### Component Structure
- **MakePayment:** Displays ride details and payment button
- **RazorpayPayment:** Handles payment integration and processing
- **RideInfo:** Shows ride information during payment process

#### Environment Variables
```env
VITE_ROZARPAY_TEST_API_KEY=your_razorpay_key
VITE_BASE_URL=your_api_base_url
```

#### Error Handling
- Displays user-friendly error messages
- Handles network failures and payment declines
- Provides clear feedback on payment status

## Page Documentation Updates

### Home Page (`/home`)
- Serves as the user's main dashboard.
- Features a map view, trip search, vehicle selection, and ride confirmation.
- Enables users to choose pickup and destination locations and view fare estimates.

### Riding Page (`/riding`)
- Displays live ride details for the user.
- Shows driver information, vehicle details, and fare.
- Includes a payment interface and automatically routes back to home after ride completion.

### Captian Home Page (`/captian-home`)
- Acts as the main dashboard for logged-in captains.
- Displays current location, ride request popups, and captain details.
- Facilitates real-time location updates and ride confirmation.

### Captian Ride Page (`/captian-ride`)
- Provides the in-ride interface for captains.
- Displays a live map, ride progress, and key ride details.
- Offers controls to end the ride and trigger the final ride-completion process.