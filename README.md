# Saarang Event Hub

A mini event management platform where users can browse upcoming events, sign up, and view their registrations.

---



## Tech Stack

- **Backend:** Node.js, Express, MongoDB (Atlas), JWT
- **Frontend:** React (create-react-app or Vite), React Router

---

## Requirements

- Node.js (v14+ recommended)
- npm or yarn
- MongoDB Atlas account (or local MongoDB instance)

---

## Setup Instructions

### 1. Clone the Repository

git clone https://github.com/your-username/saarang-event-hub.git
cd saarang-event-hub



---

### 2. Backend Setup

#### a. Install Dependencies

cd backend
npm install



#### b. Configure Environment Variables

Create a `.env` file in the `backend` folder with the following content:

PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret



#### c. Run the Backend Server

npm run dev

The server will run on `http://localhost:5000`.

---

### 3. Frontend Setup

#### a. Install Dependencies

cd ../frontend
npm install



#### b. Configure API Endpoint

If needed, update the API base URL in your frontend code (e.g., in `src/config.js`):

export const API_BASE_URL = "http://localhost:5000";


The React app will run on `http://localhost:3000`.

---

## Usage

- Open [http://localhost:3000](http://localhost:3000) in your browser.
- Sign up for a new account or log in.
- Browse the list of events.
- Click on an event to view details and register/unregister.
- Go to "My Registrations" to see events you've signed up for.

