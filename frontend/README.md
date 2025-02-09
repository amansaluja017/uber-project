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
