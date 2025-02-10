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