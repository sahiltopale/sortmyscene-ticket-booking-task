# 🎟️ SortMyScene - Event Ticket Booking System

A full-stack Event Ticket Booking application built using **React.js**, **Node.js**, **Express.js**, and **MongoDB**. The application allows users to browse events, reserve seats for a limited duration, and confirm bookings while preventing double booking.

---

## 🚀 Live Demo

### Frontend

https://sortmyscene-ticket-booking-task-1.onrender.com/

### Backend API

https://sortmyscene-ticket-booking-task.onrender.com/

---

## Demo Credentials

To make testing easier, a demo account is already available.

**Email**

```
demo@gmail.com
```

**Password**

```
Demo123
```

> Alternatively, you can register a new account directly from the application.

---

# Features

### Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Logout

---

### Event Management

- View all available events
- View individual event details
- Seat availability visualization
- Responsive event cards

---

### Seat Reservation

- Select multiple seats
- Reserve seats for **10 minutes**
- Countdown timer during reservation
- Reservation expiry handling
- Color coded seat status

Seat Status Colors

| Color  | Status    |
| ------ | --------- |
| Gray   | Available |
| Orange | Reserved  |
| Red    | Booked    |
| Green  | Selected  |

---

### Booking

- Confirm reserved seats
- Booking confirmation
- Reservation removed after successful booking
- Expired reservations cannot be booked

---

### Error Handling

- Seat already reserved
- Seat already booked
- Reservation expired
- Invalid reservation
- Unauthorized access
- Form validation

---

# Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- CSS

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- dotenv
- CORS

---

# Project Structure

```
sortmyscene-ticket-booking
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── services
│   │   ├── components
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

# Database Models

## Event

```
name
dateTime
venue
totalSeats
```

---

## Seat

```
eventId
seatNumber
status
```

Status values

- available
- reserved
- booked

---

## Reservation

```
userId
eventId
seatNumbers
expiresAt
```

---

# API Endpoints

## Authentication

### Register

```
POST /api/auth/register
```

### Login

```
POST /api/auth/login
```

---

## Events

### Get All Events

```
GET /api/events
```

### Get Event Details

```
GET /api/events/:id
```

---

## Reservation

### Reserve Seats

```
POST /api/reserve
```

Body

```json
{
  "eventId": "...",
  "seatNumbers": ["A1", "A2"]
}
```

---

## Booking

### Confirm Booking

```
POST /api/bookings
```

Body

```json
{
  "reservationId": "..."
}
```

---

# Installation

## Clone Repository

```
git clone https://github.com/YOUR_USERNAME/sortmyscene-ticket-booking-task.git
```

---

## Backend Setup

Navigate to backend

```
cd backend
```

Install dependencies

```
npm install
```

Create `.env`

```
PORT=5000

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET

FRONTEND_URL=http://localhost:5173
```

Run backend

```
npm run dev
```

---

## Frontend Setup

Navigate to frontend

```
cd frontend
```

Install dependencies

```
npm install
```

Start frontend

```
npm run dev
```

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:5000
```

---

# Booking Flow

1. Login/Register
2. View Events
3. Select Event
4. Choose Available Seats
5. Reserve Seats
6. 10-minute reservation timer starts
7. Confirm Booking
8. Seats become permanently booked

---

# Assumptions

- One event contains a fixed number of seats.
- Seat numbers are generated automatically.
- Users must be authenticated before reserving or booking seats.
- Reservations expire after 10 minutes.
- Expired reservations release seats automatically when booking is attempted.
- A user can reserve multiple seats in a single reservation.

---

# Design Decisions

## Preventing Double Booking

Before creating a reservation, the backend checks whether every selected seat is currently available.

If any selected seat is already reserved or booked, the reservation request is rejected.

This prevents two users from reserving the same seat simultaneously.

---

## Reservation Expiry

Each reservation stores an `expiresAt` timestamp.

While confirming a booking:

- expiry time is verified
- expired reservations are deleted
- reserved seats become available again

This ensures expired reservations never become bookings.

---

## Authentication

JWT authentication protects all reservation and booking APIs.

Only authenticated users can reserve or confirm seats.

---

## State Management

React Hooks were used throughout the application.

- useState
- useEffect

No external state management library was required due to the application's size.

---

# Deployment

## Backend

Deployed on Render

## Frontend

Deployed on Render

Database

MongoDB Atlas

---

# Future Improvements

- Admin Dashboard
- Payment Gateway Integration
- Email Confirmation
- QR Code Tickets
- Real-time Seat Updates using Socket.IO
- Auto cleanup using Cron Jobs
- Booking History
- User Profile
- Event Image Upload
- Search & Filter Events

---

# Author

**Sahil Topale**

GitHub

https://github.com/sahiltopale

---

# Assignment Requirements Covered

✅ User Authentication

✅ Event Listing

✅ Event Details

✅ Seat Selection

✅ Seat Reservation

✅ Booking Confirmation

✅ Reservation Expiry

✅ Error Handling

✅ Responsive UI

✅ React Hooks

✅ Component-Based Architecture

✅ REST APIs

✅ MongoDB Data Models

✅ JWT Authentication

✅ Deployment

---
